import { Button as ButtonComponent } from "@chakra-ui/react";

interface ButtonProps {
  onClick: () => void;
  colorScheme: string;
  text: string;
  leftIcon?: JSX.Element;
  marginTop?: string;
}

const Button = (props: ButtonProps) => {
  const { onClick, colorScheme, text, leftIcon, marginTop } = props;

  return (
    <ButtonComponent
      mt={marginTop}
      colorScheme={colorScheme}
      leftIcon={leftIcon}
      isFullWidth
      onClick={onClick}
    >
      {text}
    </ButtonComponent>
  );
};

export default Button;
