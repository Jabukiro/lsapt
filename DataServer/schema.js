const { makeExecutableSchema } = require('@graphql-tools/schema');
const { logger } = require("./logger");

var typeDefs = `
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
  }

  type Query{
    cart: CartList!
    getProduct(id: ID!): Product
    getProductList: [Product]!
  }

  type Mutation{
    cartOperations(input: CartOperationsInput!): CartList!
    saveCart(input: [CartProductInput!]!): String!
  }
`;

function addCart(id, context) {
  return context.getTable({ tableName: "product", term: id }, true).then((result) => {
    //Add to Cart
    logger.log({
      level: "info",
      message: `addCart(): request session id ${context.req.sessionID}`
    });
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

function clearCart(context) {
  context.req.session.value = undefined;
  return { list: [] };
}
var resolvers = {
  Query: {
    cart: (_1, _2, context) => {
      console.log("cart sessionID: ", context.req.sessionID);
      return typeof context.req.session.value === "object" ? { list: context.req.session.value } : { list: [] };
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
      console.log("saveCart sessionID: ", context.req.sessionID);
      context.req.session.value = input;
      return "Check Console for req deets";
    },
    cartOperations: (_, { input }, context) => {
      switch (input.type) {
        case 'add':
          return addCart(input.id, context);
        case 'decrement':
          return decrementCartItem(input.id, context);
        case 'remove':
          return removeCartItem(input.id, context);
        case 'clear':
          return clearCart(context);
        default:
          const errormsg = `cartOperations: Expected 'type' parameter to be one of 'add', 'decrement' or 'clear'. Instead got ${input.type}`;
          logger.log({
            level: "error",
            message: errormsg,
            input
          })
          return new Error(errormsg);
      }
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
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
exports.schema = schema;