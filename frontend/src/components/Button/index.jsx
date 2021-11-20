import styled from 'styled-components';
import React from 'react';

const ButtonUI = styled.button`
  margin: 30px 5px;
  border-radius: 25px;
  border: none;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  background-color: transparent;
`;

const Button = ({ children, handleClick }) => {
  return (
    <ButtonUI type="button" onClick={handleClick}>
      {children}
    </ButtonUI>
  );
};

export { Button };
