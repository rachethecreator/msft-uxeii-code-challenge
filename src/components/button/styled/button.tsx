import styled from 'styled-components';

const linkStyles = `
  background: none;
  border-radius: none;
  display: inline-block;
  min-width: unset;
  height: auto;
  padding: 0;
  font: inherit;
  color: #069;
`;

export const StyledButton = styled.button<{ $link?: boolean; $theme: 'primary' | 'secondary' }>`
  border: ${props => props.$theme === 'primary' ? ' none' : '2px solid #385955'};
  background: ${props => props.$theme === 'primary' ? '#385955' : '#FFF'};
  border-radius: 10px;
  font: inherit;
  color: ${props => props.$theme === 'primary' ? '#FFF' : '#385955'};
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 145px;
  height: 50px;
  cursor: pointer;
  ${({ $link }) => $link && linkStyles}

  &:hover {
    filter: ${props => props.$theme === 'primary' ? 'brightness(125%)' : 'brightness(95%)'};
  }
`;
