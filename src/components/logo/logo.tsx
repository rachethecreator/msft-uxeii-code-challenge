import { StyledLogo } from './styled/logo';

type LogoProps = {
  text?: string;
}

export const Logo = ({
  text,
}: LogoProps) => (
  <StyledLogo>
    <img src="woofer.svg" alt={text ? "" : "logo"} />
    {text && <span>{text}</span>}
  </StyledLogo>
);
