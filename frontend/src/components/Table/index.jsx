import React from 'react';
import styled from 'styled-components';

const TableUI = styled.table`
  width: 100%;
  background-color: #363636;
`;

const Table = ({ children }) => {
  return <TableUI>{children}</TableUI>;
};

export { Table };
