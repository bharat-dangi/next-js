import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { root } from "./resolvers";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const server = express();

// setup graphql
server.use(cors());
server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export default server;
