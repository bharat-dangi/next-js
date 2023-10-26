"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api/graphql.client";
import AddressForm from "./components/address";

const Home: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AddressForm />
    </ApolloProvider>
  );
};

export default Home;
