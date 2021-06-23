import { Flex, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      justifyContent="space-between"
      alignContent="center"
      p={4}
      mb={2}
      borderBottom="1px"
      borderColor="gray.100"
    >
      <Flex flexDirection="column">
        <Heading
          as="h1"
          mb="1"
          size="xs"
          fontWeight="semibold"
          textTransform="uppercase"
          color="gray.400"
          letterSpacing={0.8}
        >
          {title}
        </Heading>
        <Heading as="h2" size="md" mb="1" fontWeight="medium">
          {subtitle}
        </Heading>
      </Flex>
      <IconButton
        variant="link"
        aria-label="Switch theme"
        onClick={toggleColorMode}
        icon={
          colorMode === "dark" ? (
            <SunIcon height="24" width="24" />
          ) : (
            <MoonIcon height="24" width="24" />
          )
        }
      />
    </Flex>
  );
};
