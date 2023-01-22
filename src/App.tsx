import { Box, Flex, Center, Heading, Button, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

/*
## 需求:
  - 完成比大小遊戲
    - 遊戲流程
      1. 按下 `Start Game` 按鈕會開始遊戲，`Start Game` 按鈕隨即消失
      2. 左邊的卡片中的 `?` 會變成亂數產生的數字 A
      3. 右邊的卡片下方會出現 `Higher` 和 `Lower` 的按鈕，讓 user 擇一點選
      4. 當 user 點選 `Higher` 和 `Lower` 其中一個按鈕後，兩個按鈕隨即消失
      5. 右邊的卡片中的 `?` 會變成亂數產生的數字 B
      6. 比較兩邊的數字大小，然後根據 user 的選擇，顯示遊戲結果在卡片下方，並出現 `Play Again` 按鈕
      7. 當 user 按下 `Play Again` 按鈕後，右邊的卡片中的數字 B 會變回 `?`
      8. 左邊的數字 A 會重新亂數產生，並回到上方第三步，繼續新的一場遊戲
    - 遊戲規則
      - 兩邊的數字都是隨機產生 1~10 之間的數字
      - 當 B > A 時，且 user 選擇 `Higher`，則遊戲結果為 WIN
      - 當 B > A 時，且 user 選擇 `Lower`，則遊戲結果為 LOSE
      - 當 B < A 時，且 user 選擇 `Higher`，則遊戲結果為 LOSE
      - 當 B < A 時，且 user 選擇 `Lower`，則遊戲結果為 WIN
      - 當 B = A 時，且 user 選擇 `Higher`，則遊戲結果為 LOSE
      - 當 B = A 時，且 user 選擇 `Lower`，則遊戲結果為 LOSE
## 加分項目:
  - 重構 components
  - 使用 XState 完成遊戲的狀態切換及邏輯
    - 文件：https://xstate.js.org/docs/


*/

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

interface CardProps {
  color: string;
  content: string | number;
}

const Card = (props: CardProps) => {
  const { color, content } = props;

  return (
    <Center
      w="full"
      h="150px"
      px="24px"
      py="16px"
      bgColor="white"
      borderRadius="md"
      boxShadow="lg"
      flex={1}
    >
      <Heading fontSize="54px" color={color}>
        {content}
      </Heading>
    </Center>
  );
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
          },
        },
      },
      start: {
        on: {
          choosed: {
            target: "choosed",
            actions: assign({
              userChoice: (context: ContextProps, event) => {
                console.log("@event", event.value);

                return event.value;
              },
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
                console.log("@event", event.value);

                return event.value;
              },
            }),
          },
        },
      },
      end: {
        on: {
          start: {
            target: "start",
          },
        },
      },
    },
  });

  const [state, send, service] = useMachine(gameMachine);

  const [computerNumber, setComputerNumber] = useState(0);
  const [userNumber, setUserNumber] = useState(0);
  const [isUserWin, setIsUserWin] = useState(false);

  const startGame = () => {
    send("start");
  };

  const onHigherLowerBtnClick = (value: string) => {};

  useEffect(() => {
    const randomNumber = generateRandomNumber();
    const isGameStart = state.value === "start";
    isGameStart && setComputerNumber(randomNumber);
    const ischoosed = state.value === "choosed";

    ischoosed && setUserNumber(randomNumber);
  }, [state]);

  useEffect(() => {
    const gameResult = calculateIsUserWin(
      computerNumber,
      userNumber,
      state.context.userChoice
    );
    state.context.userChoice && setIsUserWin(gameResult);
  }, [computerNumber, userNumber, state]);
  console.log("isUserWin", isUserWin);

  useEffect(() => {
    const ischoosed = state.value === "choosed";
    ischoosed && send("end");
  }, [userNumber, isUserWin, state]);

  const ButtonGroup = () => {
    return (
      <>
        <Button
          mt="32px"
          colorScheme="twitter"
          leftIcon={<RiArrowUpSLine />}
          isFullWidth
          onClick={() => {
            // send("choosed", { value: "higher" });
            service.send("choosed", { value: "higher" });
            // interpreter.send({ type: "choosed", value: "higher" });
          }}
        >
          Higher
        </Button>
        <Button
          mt="8px"
          colorScheme="facebook"
          leftIcon={<RiArrowDownSLine />}
          isFullWidth
          onClick={() => {
            send("choosed", { value: "lower" });
          }}
        >
          Lower
        </Button>
      </>
    );
  };

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
              <ButtonGroup />
            </Flex>
          </Flex>

          <Box mt="64px">
            <Button colorScheme="blue" onClick={startGame}>
              Start Game
            </Button>
          </Box>

          {/* Game result UI */}
          {/* <Stack mt="24px" spacing="16px">
            <Heading color="twitter.300" align="center">
              WIN!
            </Heading>
            <Heading color="red.300" align="center">
              LOSE!
            </Heading>

            <Button
              colorScheme="blue"
              onClick={() => {
                // TODO: Clear game result and start a new game
              }}
            >
              Play Again
            </Button>
          </Stack> */}
        </Flex>
      </Center>
    </Box>
  );
};

export default App;
