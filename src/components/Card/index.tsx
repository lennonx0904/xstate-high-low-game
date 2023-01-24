import { Center, Heading } from "@chakra-ui/react";

import { CardProps } from "../../interface";

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

export default Card;
