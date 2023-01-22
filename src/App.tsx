import { useEffect, useState } from "react";
import { Box, Flex, Center, Heading, Stack } from "@chakra-ui/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

import { Card, Button } from "./components";

const generateRandomNumber = () => Math.floor(Math.random() * 10) + 1;

const calculateIsUserWin = (
  computerNumber: number,
  userNumber: number,
  userChoice: string
) => {
  const isUserChooseHigher = userChoice === "higher";
  if (
    (isUserChooseHigher && userNumber > computerNumber) ||
    (!isUserChooseHigher && userNumber < computerNumber)
  ) {
    return true;
  }

  return false;
};

interface ContextProps {
  computerNumber: number;
  userNumber: number;
  userChoice: string;
  isUserWin: boolean;
}

const App = () => {
  const gameMachine = createMachine<ContextProps>({
    initial: "inactive",
    context: {
      computerNumber: 0,
      userNumber: 0,
      userChoice: "",
      isUserWin: false,
    },
    states: {
      inactive: {
        on: {
          start: {
            target: "start",
            actions: assign({
              computerNumber: (context: ContextProps, event) =>
                event.computerNumber,
              // userNumber: (context: ContextProps, event) => 0,
            }),
          },
        },
      },
      start: {
        on: {
          choosed: {
            target: "choosed",
            actions: assign({
              userChoice: (context: ContextProps, event) => event.userChoice,
              userNumber: (context: ContextProps, event) => event.userNumber,
            }),
          },
        },
      },
      choosed: {
        on: {
          end: {
            target: "end",
            actions: assign({
              isUserWin: (context: ContextProps, event) => {
                console.log("@event", event.isUserWin);

                return event.isUserWin;
              },
            }),
          },
        },
      },
      end: {
        on: {
          start: {
            target: "start",
            actions: assign({
              computerNumber: (context: ContextProps, event) =>
                event.computerNumber,
              userNumber: (context: ContextProps, event) => 0,
            }),
          },
        },
      },
    },
  });

  const [state, send] = useMachine(gameMachine);

  const computerNumber = state.context.computerNumber;
  const userNumber = state.context.userNumber;
  const isUserWin = state.context.isUserWin;

  console.log("userNumber", userNumber);

  const startGame = () =>
    send("start", { computerNumber: generateRandomNumber(), userNumber: 0 });
  console.log("@state.value", state.value);

  console.log("@state.context", state.context);

  // useEffect(() => {
  //   const randomNumber = generateRandomNumber();
  //   const isGameStart = state.value === "start";
  //   isGameStart && setComputerNumber(randomNumber);
  // }, [state]);

  useEffect(() => {
    const gameResult = calculateIsUserWin(
      computerNumber,
      userNumber,
      state.context.userChoice
    );
    state.context.userChoice && send("end", { isUserWin: gameResult });
  }, [computerNumber, userNumber, state]);

  const isInactive = state.value === "inactive";
  const isStart = state.value === "start";
  const isEnd = state.value === "end";

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

              {/* `Higher` and `Lower` buttons UI */}

              {isStart && (
                <>
                  <Button
                    onClick={() =>
                      send("choosed", {
                        userChoice: "higher",
                        userNumber: generateRandomNumber(),
                      })
                    }
                    colorScheme="twitter"
                    leftIcon={<RiArrowUpSLine />}
                    text="Higher"
                    marginTop="32px"
                  />
                  <Button
                    onClick={() =>
                      send("choosed", {
                        userChoice: "lower",
                        userNumber: generateRandomNumber(),
                      })
                    }
                    colorScheme="facebook"
                    leftIcon={<RiArrowDownSLine />}
                    text="Lower"
                    marginTop="8px"
                  />
                </>
              )}
            </Flex>
          </Flex>

          {isInactive && (
            <Box mt="64px">
              <Button
                onClick={startGame}
                colorScheme="blue"
                text="Start Game"
              />
            </Box>
          )}

          {/* Game result UI */}
          {isEnd && (
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
              <Button
                colorScheme="blue"
                text=" Play Again"
                onClick={() => {
                  startGame();
                  console.log("Clear game result and start a new game");
                }}
              />
            </Stack>
          )}
        </Flex>
      </Center>
    </Box>
  );
};

export default App;
