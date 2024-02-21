import styled from 'styled-components';

const errorStyles = `
    border: 0.0625rem solid #d5351f;
`;

export const StyledInput = styled.div<{ $error?: boolean }>`
  width: 100%;

  input {
    background-color: #fff;
    border: 1px solid #B1B1B9;
    border-radius: 10px;
    padding: 0 24px;
    width: 100%;
    height: 50px;
    font-size: 16px;
    ${({ $error }) => $error && errorStyles}
  }

  label {
    font-weight: 500;
  }

  input::placeholder {
    color: #B1B1B9;
    font-weight: 500;
  }

  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;
