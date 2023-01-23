import { Heading, Stack } from "@chakra-ui/react";

import { Button } from "../components";

interface ComponentProps {
  onClick: (arg?: string) => void;
  isUserWin?: boolean;
}

const EndComponent = (props: ComponentProps) => {
  const { onClick, isUserWin } = props;

  return (
    <Stack mt="24px" spacing="16px">
      {isUserWin ? (
        <Heading color="twitter.300" align="center">
          WIN!
        </Heading>
      ) : (
        <Heading color="red.300" align="center">
          LOSE!
        </Heading>
      )}
      <Button colorScheme="blue" text=" Play Again" onClick={onClick} />
    </Stack>
  );
};

export default EndComponent;
