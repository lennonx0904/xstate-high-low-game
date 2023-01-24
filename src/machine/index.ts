import { createMachine, assign } from "xstate";
import { ContextProps } from "../interface";

export const gameMachine = createMachine<ContextProps>({
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
            isUserWin: (context: ContextProps, event) => event.isUserWin,
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
