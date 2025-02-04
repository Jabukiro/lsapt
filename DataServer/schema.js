//TODO: change session.value to a more representative name eg: session.products
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { GraphQLDate } = require('graphql-scalars');
const { logger } = require("./logger");

var typeDefs = `

  scalar Date

  enum GENDER{
    FEMALE
    MALE
  }

  interface ProductInterface{
    id: ID
    name: String
    description: String
    image: String
    fee: Float
  }

  type Product implements ProductInterface {
    id: ID
    name: String
    description: String
    image: String
    fee: Float
    attributes: String
    timestamp: String
  }

  type Athlete {
    id: ID
    full_name: String
    gender: GENDER
    dob: Date
    guardian: Guardian
  }
  input AthleteInput {
    id: ID
    full_name: String!
    gender: GENDER!
    dob: Date!
    school: String!
    guardian: GuardianInput
  }

  type CartProduct implements ProductInterface {
    id: ID
    name: String
    description: String
    image: String
    attributes: String
    fee: Float
    count: Int
  }
  input CartProductInput {
    id: ID
    name: String
    description: String
    image: String
    attributes: String
    fee: Float
    count: Int
  }

  input CartOperationsInput{
    id: ID!
    type: String!
  }

  type CartList{
    list: [CartProduct]!
    registeredSessions: [RegisteredSession]
  }

  type Guardian{
    id: ID
    full_name: String
    email: String
    contact_number: String
    address: String
    alt_name: String
    alt_contact_number: String
  }
  input GuardianInput{
    id: ID
    full_name: String!
    email: String!
    contact_number: String!
    address: String!
    alt_name: String!
    alt_contact_number: String!
  }

  type RegisteredSession{
    id: ID
    session: Session!
    athleteList: [Athlete]!
    guardianInfo: Guardian
  }

  type Session{
    id: ID
    name: String
    description: String
    image: String
    attributes: String
    fee: Float
    href: String
}
  input SessionInput{
    name: String
    description: String
    image: String
    attributes: String
    fee: Float
    href: String
}

  input SessionRegistration{
    sessionHref: String!
    athleteList: [AthleteInput!]!
    guardianInfo: GuardianInput
  }

  type Query{
    cart: CartList!
    specificCart(s: String!): CartList!
    getProduct(id: ID!): Product
    getProductList: [Product]!
  }

  type Mutation{
    cartOperations(input: CartOperationsInput!): CartList!
    saveCart(input: [CartProductInput!]!): String!
    clearCart: CartList!
    addSessionToCart(input: SessionRegistration!): [RegisteredSession]!
    log(message: String!): String!
  }
`;

function addCart(id, context) {
  return context.getTable({ tableName: "product", term: id }, true).then((result) => {
    //Add to Cart
    const oldCart = typeof context.req.session.value === 'object' ? context.req.session.value : [];
    const list = context.Cart.add(result, oldCart);
    context.req.session.value = list;
    return { list };
  })
}
function decrementCartItem(id, context) {
  return new Promise((resolve, reject) => {
    if (typeof context.req.session.value === 'object') {
      //Decrementing item only makes sense if session has a saved value
      const list = context.Cart.decrementItem(id, context.req.session.value);
      context.req.session.value = list;
      return resolve({ list });
    }
    //session.value not an object as expected.
    logger.log({
      level: "error",
      message: "decrementItem: Attempted operation on cart with non-object type. Most likely cart is not initialised.",
      cart: context.req.session.value
    });
    return reject(new Error(`decrementItem: Attempted operation on cart with non-object type. Most likely cart is not initialised.`));
  });
}
function removeCartItem(id, context) {
  return new Promise((resolve, reject) => {
    if (typeof context.req.session.value === 'object') {
      //removing item only makes sense if session has a saved value
      const list = context.Cart.removeItem(id, context.req.session.value);
      context.req.session.value = list;
      return resolve({ list });
    }
    const errormsg = `removeItem: Attempted operation on cart with non-object type. Most likely cart is not initialised.`;
    logger.log({
      level: "error",
      message: errormsg,
      cart: context.req.session.value
    });
    return reject(new Error(errormsg));
  });
}
function removeSession(id, context) {
  if (typeof context.req.session.registeredSessions !== 'object') return [];
  context.req.session.registeredSessions = context.Cart.removeSession(id, context.req.session.registeredSessions);
  logger.log({
    level: "info",
    message: `removeSession registeredSessions: id-${id} / ${JSON.stringify(context.req.session.registeredSessions)}`,
  })
  typeof context.req.session.cart !== 'object'
  return {
    list: typeof context.req.session.value === "object" ? context.req.session.value : [],
    registeredSessions: context.req.session.registeredSessions,
  };
}

function clearCart(context) {
  return new Promise((resolve, reject) => {
    logger.log({
      level: "info",
      message: `clearCart(): Setting stored values in session to undefined`,
    })
    context.req.session.value = undefined;
    context.req.session.registeredSessions = undefined;
    return resolve({ list: [] });
  })
}
var resolvers = {
  Query: {
    cart: (_1, _2, context) => {
      //Check if cart values are initialised and return them or empty lists if not.
      const registeredSessions = typeof context.req.session.registeredSessions === "object" ? context.req.session.registeredSessions : [];
      const list = typeof context.req.session.value === "object" ? context.req.session.value : [];

      return { registeredSessions, list };
    },
    getProduct: (_, { id }, { getTable }) => getTable({ tableName: "product", term: id }, true),
    getProductList: (_1, _2, { DBMan }) => {
      const queryOptions = {
        useDefaultQuery: false,
        bindParams: ["product"],
        customQuery: `SELECT * FROM ??`,
      }
      return DBMan.SelectQuery(queryOptions).then((products) => {
        return products;
      }).catch((reason) => {
        logger.log({
          level: "error",
          message: "Error from DBMan whilst running getProductList with",
          reason
        });
        return null;
      });
    }
  },
  Mutation: {
    saveCart: (_, { input }, context) => {
      context.req.session.value = input;
      return "Check Console for req deets";
    },
    clearCart: (_, _1, context) => clearCart(context),
    cartOperations: async (_, { input }, context) => {
      //all switches but removeSession are untested and most likely do not work
      switch (input.type) {
        case 'add':
          return addCart(input.id, context);
        case 'decrement':
          return decrementCartItem(input.id, context);
        case 'remove':
          return removeCartItem(input.id, context);
        case 'removeSession':
          return removeSession(input.id, context);
        case 'clear':
          return clearCart(context);
        default:
          const errormsg = `cartOperations: Expected 'type' parameter to be one of 'add', 'decrement', 'remove', 'removeSession' or 'clear'. Instead got ${input.type}`;
          logger.log({
            level: "error",
            message: errormsg,
            input
          })
          return new Error(errormsg);
      }
    },
    addSessionToCart: (_, { input }, context) => {
      logger.log({
        level: "info",
        message: `addSessionToCart input: ${JSON.stringify(input)}`,
      })
      return context.getTable({ tableName: "trainingSessions", term: input.sessionHref, column: "href" }, true).then((result) => {
        //Add to Cart
        const oldCart = typeof context.req.session.registeredSessions === 'object' ? context.req.session.registeredSessions : [];
        const newRegisteredSession = {
          session: result,
          athleteList: input.athleteList,
          guardianInfo: input.guardianInfo
        }
        logger.log({
          level: "info",
          message: `addSessionToCart newRegisteredSession: ${JSON.stringify(newRegisteredSession)}\n`,
        })
        const registeredSessions = context.Cart.addSession(newRegisteredSession, oldCart);
        context.req.session.registeredSessions = registeredSessions;
        logger.log({
          level: "info",
          message: `addSessionToCart registeredSessions: ${JSON.stringify(registeredSessions)}`,
        })
        return registeredSessions;
      })
    },
    log: (_, { message }) => {
      return new Promise((resolve, reject) => {
        logger.log({
          level: "info",
          message,
        })
        return resolve("ACK");
      })
    }
  },
  Product: {
    __resolveType: (productinterface, args, context, info) => {
      switch (productinterface.count) {
        case undefined:
          return "Product";
        default:
          return "CartProduct";
      }
    }
  },
  Date: GraphQLDate,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
exports.schema = schema;