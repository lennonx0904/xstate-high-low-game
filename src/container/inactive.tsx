import { Box } from "@chakra-ui/react";
import { Button } from "../components";

interface ComponentProps {
  onClick: () => void;
}

const InactiveComponent = (props: ComponentProps) => {
  const { onClick } = props;

  return (
    <Box mt="64px">
      <Button onClick={onClick} colorScheme="blue" text="Start Game" />
    </Box>
  );
};

export default InactiveComponent;
