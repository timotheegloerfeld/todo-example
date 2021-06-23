import { useBoolean } from "@chakra-ui/hooks";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { Todo } from "../generated/graphql";
import { TodoItem } from "./TodoItem";

interface DoneListProps {
  todos: Todo[] | undefined;
}

export const DoneList: React.FC<DoneListProps> = ({ todos }) => {
  const [isOpen, setIsOpen] = useBoolean();

  return (
    <Box>
      <Flex
        as="button"
        onClick={setIsOpen.toggle}
        justifyContent="space-between"
        px="4"
        py="3"
        width="100%"
        borderTop="1px"
        borderColor="gray.200"
      >
        <Text fontWeight="medium">{`Completed (${todos?.length})`}</Text>
        {isOpen ? (
          <ChevronUpIcon width="24" height="24" />
        ) : (
          <ChevronDownIcon width="24" height="24" />
        )}
      </Flex>
      {isOpen && (
        <Stack>
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </Stack>
      )}
    </Box>
  );
};
