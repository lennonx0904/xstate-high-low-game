import { useEffect } from "react";
import { Box, Flex, Center, Heading } from "@chakra-ui/react";
import { useMachine } from "@xstate/react";

import { Card } from "../components";
import { gameMachine } from "../machine";
import { generateRandomNumber, calculateIsUserWin } from "../utils";
import StartComponent from "./start";
import InactiveComponent from "./inactive";
import EndComponent from "./end";

const Game = () => {
  const [state, send] = useMachine(gameMachine);

  const computerNumber = state.context.computerNumber;
  const userNumber = state.context.userNumber;
  const isUserWin = state.context.isUserWin;

  const isInactive = state.value === "inactive";
  const isStart = state.value === "start";
  const isEnd = state.value === "end";

  const onStartBtnClick = () =>
    send("start", { computerNumber: generateRandomNumber(), userNumber: 0 });

  const onChooseBtnClick = (userChoice: string) =>
    send("choosed", {
      userChoice,
      userNumber: generateRandomNumber(),
    });

  useEffect(() => {
    const isUserWin = calculateIsUserWin(
      computerNumber,
      userNumber,
      state.context.userChoice
    );
    state.context.userChoice && send("end", { isUserWin });
  }, [computerNumber, userNumber, state]);

  return (
    <Box bgColor="#f3f3f3" h="100vh">
      <Center pt="120px">
        <Flex w="400px" px="64px" direction="column" align="center">
          <Flex mb="64px">
            <Heading mr="16px" fontSize="36px" color="twitter.500">
              High
            </Heading>
            <Heading fontSize="36px" color="facebook.500">
              Low
            </Heading>
          </Flex>
          <Flex w="full" justify="space-between">
            <Flex maxW="120px" flex={1}>
              <Card color="gray.500" content={computerNumber || "?"} />
            </Flex>
            <Flex maxW="120px" flex={1} direction="column">
              <Card color="blue.500" content={userNumber || "?"} />
              {isStart && (
                <StartComponent
                  onClick={(userChoice: string) => onChooseBtnClick(userChoice)}
                />
              )}
            </Flex>
          </Flex>
          {isInactive && <InactiveComponent onClick={onStartBtnClick} />}
          {isEnd && (
            <EndComponent onClick={onStartBtnClick} isUserWin={isUserWin} />
          )}
        </Flex>
      </Center>
    </Box>
  );
};

export default Game;
