import { buildSchema } from "graphql";

const schema = buildSchema(`
   type Address {
    postalCode: String!
    suburb: String!
    state: String!
  }

  type Response {
    message: String!
  }

  type Query {
        checkAddress(postalCode: String!
          suburb: String!
          state: String!): Response
    }
`);

export default schema;
