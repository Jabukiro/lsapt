const { makeExecutableSchema } = require('@graphql-tools/schema');

var typeDefs = `
  type Product {
    id: ID
    name: String
    description: String
    image: String
    fee: Float
    timestamp: String
  }
  type CartProduct {
    id: ID
    name: String
    description: String
    cost: Float
    count: Int
  }
  input CartProductInput {
    id: ID
    name: String
    description: String
    cost: Float
    count: Int
  }


  type Query{
    cart: [CartProduct]
    getProduct(id: ID!): Product
  }

  type Mutation{
    saveCart(input: [CartProductInput!]!): String!
  }
`;

var resolvers = {
  Query: {
    cart: (_1, _2, context) => {
      console.log("cart sessionID: ", context.req.sessionID);
      return context.req.session.value
    },
    getProduct: (_, { id }, { getTable }) => getTable({ tableName: "product", term: id }, true)
  },
  Mutation: {
    saveCart: (_, { input }, context) => {
      console.log("saveCart sessionID: ", context.req.sessionID);
      context.req.session.value = input;
      return "Check Console for req deets";
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
exports.schema = schema;