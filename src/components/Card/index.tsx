import { Center, Heading } from "@chakra-ui/react";

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

export default Card;
