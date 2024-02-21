import { ImgHTMLAttributes } from "react";
import { StyledCard } from "./styled/card";

type CardProps = {
  img: string;
  label: string;
  showLabel?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Card = ({
  img,
  label,
  showLabel = true,
  ...props
}: CardProps) => {
  return (
    <StyledCard>
      <img {...props} loading="lazy" src={img} alt={showLabel ? '' : label} />
      {showLabel && <span>{label}</span>}
    </StyledCard>
  )
};
