import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://noble-kitten-87.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "4xApIyqSvBwseIwdJve2TcVeJ1GRLMj34P8nUaP6NiH6tEVAjnFZg4pFAT0SiFfl", // Замените на ваш административный секрет
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
