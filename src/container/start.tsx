import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Button } from "../components";

interface ComponentProps {
  onClick: (userChoice: string) => void;
}

const StartComponent = (props: ComponentProps) => {
  const { onClick } = props;

  return (
    <>
      <Button
        onClick={() => onClick("higher")}
        colorScheme="twitter"
        leftIcon={<RiArrowUpSLine />}
        text="Higher"
        marginTop="32px"
      />
      <Button
        onClick={() => onClick("lower")}
        colorScheme="facebook"
        leftIcon={<RiArrowDownSLine />}
        text="Lower"
        marginTop="8px"
      />
    </>
  );
};

export default StartComponent;
