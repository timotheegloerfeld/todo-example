import { Button, Text } from "@chakra-ui/react";
import { CheckIcon } from "@heroicons/react/outline";
import React from "react";
import { useAddMutation } from "../generated/graphql";

export const AddTodo: React.FC = () => {
  const [addResult, add] = useAddMutation();

  const handleAdd = () => {
    add({ text: "" });
  };

  return (
    <Button
      onClick={handleAdd}
      leftIcon={<CheckIcon width="24" height="24" />}
      display="flex"
      justifyContent="flex-start"
      p="2"
      my="1"
      mx="2"
      borderRadius="full"
      variant="ghost"
    >
      <Text ml="2">Add a task</Text>
    </Button>
  );
};
