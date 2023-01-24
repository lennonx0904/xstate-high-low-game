export interface ButtonProps {
  onClick: () => void;
  colorScheme: string;
  text: string;
  leftIcon?: JSX.Element;
  marginTop?: string;
}

export interface CardProps {
  color: string;
  content: string | number;
}

export interface StateComponentProps {
  onClick: (arg?: string) => void;
  isUserWin?: boolean;
}

export interface ContextProps {
  computerNumber: number;
  userNumber: number;
  userChoice: string;
  isUserWin: boolean;
}
