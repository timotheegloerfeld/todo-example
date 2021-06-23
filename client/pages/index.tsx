import { Flex } from "@chakra-ui/react";
import { DoneList } from "../components/DoneList";
import { Header } from "../components/Header";
import { TodoList } from "../components/TodoList";
import { useTodosQuery } from "../generated/graphql";

export default function Home() {
  const [{ data, fetching, error }] = useTodosQuery();

  const todos = data?.todos.filter((todo) => !todo.isDone);
  const dones = data?.todos.filter((todo) => todo.isDone);

  return (
    <>
      <Header title="Tasks" subtitle="My Tasks" />
      <Flex overflowY="auto" flexDir="column" justifyContent="space-between">
        <TodoList todos={todos} />
        <DoneList todos={dones} />
      </Flex>
    </>
  );
}
