import { Button as ButtonComponent } from "@chakra-ui/react";

import { ButtonProps } from "interface";

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
