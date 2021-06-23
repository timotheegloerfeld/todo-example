import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import type { AppProps } from "next/app";
import React from "react";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { TodoAppContainer } from "../components/TodoAppContainer";
import { Todo, TodosDocument } from "../generated/graphql";
import { theme } from "../theme";

const client = createClient({
  url: "http://localhost:5000/graphql",
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          addTodo: (result, args, cache) => {
            cache.updateQuery({ query: TodosDocument }, (data) => {
              return { ...data, todos: [...data.todos, result.addTodo] };
            });
          },
          deleteTodo: (result, args, cache) => {
            cache.updateQuery({ query: TodosDocument }, (data) => {
              var filteredTodos = data.todos.filter(
                (t: Todo) => t.id !== args.id
              );
              return { ...data, todos: filteredTodos };
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <TodoAppContainer>
          <Component {...pageProps} />
        </TodoAppContainer>
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
