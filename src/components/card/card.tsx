import { ImgHTMLAttributes } from "react";
import { StyledCard } from "./styled/card";

type CardProps = {
  img: string;
  label: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Card = ({
  img,
  label,
  ...props
}: CardProps) => {
  return (
    <StyledCard>
      <img {...props} loading="lazy" src={img} aria-hidden={true} />
      <span>{label}</span>
    </StyledCard>
  )
};
