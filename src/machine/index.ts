import { createMachine, assign } from "xstate";
import { ContextProps } from "../interface";
import { INACTIVE, START, CHOOSED, END } from "constant";

export const gameMachine = createMachine<ContextProps>({
  initial: INACTIVE,
  context: {
    computerNumber: 0,
    userNumber: 0,
    userChoice: "",
    isUserWin: false,
  },
  states: {
    [INACTIVE]: {
      on: {
        START: {
          target: START,
          actions: assign({
            computerNumber: (context: ContextProps, event) =>
              event.computerNumber,
          }),
        },
      },
    },
    [START]: {
      on: {
        [CHOOSED]: {
          target: CHOOSED,
          actions: assign({
            userChoice: (context: ContextProps, event) => event.userChoice,
            userNumber: (context: ContextProps, event) => event.userNumber,
          }),
        },
      },
    },
    [CHOOSED]: {
      on: {
        [END]: {
          target: END,
          actions: assign({
            isUserWin: (context: ContextProps, event) => event.isUserWin,
          }),
        },
      },
    },
    [END]: {
      on: {
        [START]: {
          target: START,
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
