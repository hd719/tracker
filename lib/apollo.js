import ApolloClient from "apollo-boost";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import { InMemoryCache } from "apollo-cache-inmemory";

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    // Client side stuff
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // set the initial props
  WithApollo.getInitialProps = async (ctx) => {
    // ctx is the response the request and the apollo client
    const { AppTree } = ctx; // AppTree is a component (our entire App)
    const apolloClient = (ctx.apolloClient = initApolloClient()); //Initializing apolloClient on server

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    // If on server
    if (typeof window === "undefined") {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }

      try {
        const { getDataFromTree } = await import("@apollo/react-ssr");
        await getDataFromTree(
          <AppTree // App tree is the entire tree of our application
            pageProps={{
              ...pageProps,
              apolloClient,
            }}
          />
        );
      } catch (e) {
        console.error(e);
      }

      // Calls componentWillUnmount for getInitialProps
      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState,
    };
  };

  return WithApollo;
}

const initApolloClient = (initialState = {}) => {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache().restore(initialState); // create a new cache and restore it from initial state
  const client = new ApolloClient({
    ssrMode,
    uri: "http://localhost:3000/api/graphql", // this can be any graphql api, so it can be our local graphql api that we are using on localhost:4000 or something remote such as https://www.graphqlhub.com/graphql
    fetch,
    cache,
  });
  return client;
};
