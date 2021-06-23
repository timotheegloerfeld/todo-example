import { Stack } from "@chakra-ui/react";
import { Todo } from "../generated/graphql";
import { AddTodo } from "./AddTodo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[] | undefined;
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <Stack>
      <AddTodo />
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Stack>
  );
};
