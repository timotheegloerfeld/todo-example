import { Center, Grid, useColorMode } from "@chakra-ui/react";

export const TodoAppContainer: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Center h="100vh" py="16">
      <Grid
        templateRows="min-content minmax(0, 1fr)"
        minH="20em"
        h="100%"
        maxH="50em"
        w="20em"
        style={{
          boxShadow:
            colorMode === "light"
              ? "2px 2px 8px 1px rgba(0,0,0,0.35)"
              : "2px 2px 8px 1px rgba(0,0,0,0.75)",
        }}
      >
        {children}
      </Grid>
    </Center>
  );
};
