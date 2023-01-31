import { Box } from "@chakra-ui/react";
import { Button } from "components";
import { StateComponentProps } from "interface";

const InactiveComponent = (props: StateComponentProps) => {
  const { onClick } = props;

  return (
    <Box mt="64px">
      <Button onClick={onClick} colorScheme="blue" text="Start Game" />
    </Box>
  );
};

export default InactiveComponent;
