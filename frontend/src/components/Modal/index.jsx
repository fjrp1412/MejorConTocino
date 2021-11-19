import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalUI = styled.div`
  background: rgba(32, 35, 41, 0.8);
  position: fixed;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <ModalUI>{children}</ModalUI>,
    document.getElementById('modal')
  );
};

export { Modal };
