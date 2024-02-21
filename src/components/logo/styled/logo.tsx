import styled from 'styled-components';

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  pointer-events: none;

  img {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }

  span {
    font-weight: 700;
    font-size: 24px;
    color: #2F3A4B;
  }
`;
