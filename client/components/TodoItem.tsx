import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Todo,
  useCheckMutation,
  useDeleteMutation,
  useRenameMutation,
  useUncheckMutation,
} from "../generated/graphql";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [checkResult, check] = useCheckMutation();
  const [uncheckResult, uncheck] = useUncheckMutation();
  const [deleteTodoResult, deleteTodo] = useDeleteMutation();
  const [renameResult, rename] = useRenameMutation();
  const [isChecked, setIsChecked] = useState(todo.isDone);
  const [text, setText] = useState(todo.text);
  const [isFocused, setIsFocused] = useState(false);
  const toast = useToast();

  const debouncedRename = useDebouncedCallback((text) => {
    rename({ id: todo.id, text });
  }, 500);

  const variants = {
    todo: { x1: "0", x2: "0", y1: "55%", y2: "55%" },
    done: { x1: "0", x2: "100%", y1: "55%", y2: "55%" },
  };

  const handleCheckChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (!e.target.checked) {
      await uncheck({ id: todo.id });
      console.log("uncheck");
    }
  };

  const handleCheckMutation = async () => {
    // don't call check if component is just being rendered
    if (!todo.isDone) {
      if (todo.text.length === 0) {
        await deleteTodo({ id: todo.id });
        toast({
          position: "bottom-left",
          isClosable: true,
          title: "Todo has been deleted.",
        });
      } else {
        await check({ id: todo.id });
      }
    }
  };

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    debouncedRename(e.target.value);
  };

  const { colorMode } = useColorMode();

  return (
    <Flex alignItems="center" px="4" py="2" borderRadius="md">
      <Checkbox isChecked={isChecked} onChange={handleCheckChange} mr="2" />
      <Flex flexGrow={1}>
        {isChecked ? (
          <Flex h="8" alignItems="center" position="relative">
            <svg
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
              }}
            >
              <motion.line
                variants={variants}
                animate={isChecked ? "done" : "todo"}
                onAnimationComplete={handleCheckMutation}
                stroke={colorMode === "light" ? "black" : "white"}
              />
            </svg>
            <Text mb="0.5">{todo.text}</Text>
          </Flex>
        ) : (
          <Editable defaultValue={text} h="8" w="100%">
            <EditableInput
              onInput={handleInput}
              placeHolder="Task"
              value={text}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <EditablePreview w="100%" />
          </Editable>
        )}
      </Flex>
    </Flex>
  );
};
