import styled from 'styled-components';

export const StyledCard = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;
  height: auto;

  span {
    font-weight: 500;
    font-size: 1.5rem;
    color: #2F3A4B;
    padding-left: 15px;
    text-transform: lowercase;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  img {
    filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.14)) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.12));
    border-radius: 20px;
    width: 100%;
    height: 250px;
    object-fit: cover;
    object-position: 50% 25%;
  }
`;
