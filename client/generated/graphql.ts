import * as Urql from "urql";
import { gql } from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Uuid: any;
};

export type List = {
  __typename?: "List";
  todos: Array<Todo>;
};

export type Mutation = {
  __typename?: "Mutation";
  addTodo: Todo;
  checkTodo: Todo;
  uncheckTodo: Todo;
  renameTodo: Todo;
  deleteTodo: Todo;
};

export type MutationAddTodoArgs = {
  text: Scalars["String"];
};

export type MutationCheckTodoArgs = {
  id: Scalars["Uuid"];
};

export type MutationUncheckTodoArgs = {
  id: Scalars["Uuid"];
};

export type MutationRenameTodoArgs = {
  id: Scalars["Uuid"];
  text: Scalars["String"];
};

export type MutationDeleteTodoArgs = {
  id: Scalars["Uuid"];
};

export type Todo = {
  __typename?: "Todo";
  text: Scalars["String"];
  isDone: Scalars["Boolean"];
  id: Scalars["Uuid"];
};

export type TodosQueryVariables = Exact<{ [key: string]: never }>;

export type TodosQuery = { __typename?: "List" } & {
  todos: Array<{ __typename?: "Todo" } & Pick<Todo, "id" | "text" | "isDone">>;
};

export type CheckMutationVariables = Exact<{
  id: Scalars["Uuid"];
}>;

export type CheckMutation = { __typename?: "Mutation" } & {
  checkTodo: { __typename?: "Todo" } & Pick<Todo, "id" | "isDone">;
};

export type UncheckMutationVariables = Exact<{
  id: Scalars["Uuid"];
}>;

export type UncheckMutation = { __typename?: "Mutation" } & {
  uncheckTodo: { __typename?: "Todo" } & Pick<Todo, "id" | "isDone">;
};

export type AddMutationVariables = Exact<{
  text: Scalars["String"];
}>;

export type AddMutation = { __typename?: "Mutation" } & {
  addTodo: { __typename?: "Todo" } & Pick<Todo, "id" | "text" | "isDone">;
};

export type DeleteMutationVariables = Exact<{
  id: Scalars["Uuid"];
}>;

export type DeleteMutation = { __typename?: "Mutation" } & {
  deleteTodo: { __typename?: "Todo" } & Pick<Todo, "id">;
};

export type RenameMutationVariables = Exact<{
  id: Scalars["Uuid"];
  text: Scalars["String"];
}>;

export type RenameMutation = { __typename?: "Mutation" } & {
  renameTodo: { __typename?: "Todo" } & Pick<Todo, "id" | "text">;
};

export const TodosDocument = gql`
  query Todos {
    todos {
      id
      text
      isDone
    }
  }
`;

export function useTodosQuery(
  options: Omit<Urql.UseQueryArgs<TodosQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<TodosQuery>({ query: TodosDocument, ...options });
}
export const CheckDocument = gql`
  mutation Check($id: Uuid!) {
    checkTodo(id: $id) {
      id
      isDone
    }
  }
`;

export function useCheckMutation() {
  return Urql.useMutation<CheckMutation, CheckMutationVariables>(CheckDocument);
}
export const UncheckDocument = gql`
  mutation Uncheck($id: Uuid!) {
    uncheckTodo(id: $id) {
      id
      isDone
    }
  }
`;

export function useUncheckMutation() {
  return Urql.useMutation<UncheckMutation, UncheckMutationVariables>(
    UncheckDocument
  );
}
export const AddDocument = gql`
  mutation Add($text: String!) {
    addTodo(text: $text) {
      id
      text
      isDone
    }
  }
`;

export function useAddMutation() {
  return Urql.useMutation<AddMutation, AddMutationVariables>(AddDocument);
}
export const DeleteDocument = gql`
  mutation Delete($id: Uuid!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export function useDeleteMutation() {
  return Urql.useMutation<DeleteMutation, DeleteMutationVariables>(
    DeleteDocument
  );
}
export const RenameDocument = gql`
  mutation Rename($id: Uuid!, $text: String!) {
    renameTodo(id: $id, text: $text) {
      id
      text
    }
  }
`;

export function useRenameMutation() {
  return Urql.useMutation<RenameMutation, RenameMutationVariables>(
    RenameDocument
  );
}
