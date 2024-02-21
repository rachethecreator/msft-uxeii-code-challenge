import { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './styled/button';

type ButtonProps = {
  label: string;
  theme?: 'primary' | 'secondary';
  showAsLink?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ label, theme = 'primary', showAsLink, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props} $theme={theme} $link={showAsLink}>
      {label}
    </StyledButton>
  );
};
