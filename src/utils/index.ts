export const generateRandomNumber = () => Math.floor(Math.random() * 10) + 1;

export const calculateIsUserWin = (
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