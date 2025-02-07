"use client";

import React, { ReactNode } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  //split,
} from "@apollo/client";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import { getMainDefinition } from "@apollo/client/utilities";

export const Provider = ({ children }: { children: ReactNode }) => {
  const httpLink = new HttpLink({
    uri: "https://localhost:7271/graphql",
  });

  //   const wsLink = new GraphQLWsLink(
  //     createClient({
  //       url: "http://localhost:5287/graphql",
  //     })
  //   );

  //   const splitLink = split(
  //     ({ query }) => {
  //       const definition = getMainDefinition(query);
  //       return (
  //         definition.kind === "OperationDefinition" &&
  //         definition.operation === "subscription"
  //       );
  //     },
  //     wsLink,
  //     httpLink
  //   );

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
