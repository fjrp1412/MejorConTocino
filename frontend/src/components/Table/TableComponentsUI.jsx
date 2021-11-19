import styled from 'styled-components';

const TableHead = styled.thead`
  background-color: black;
  color: white;
  height: 30px;

  & tr th button {
    width: 100%;
    color: white;
    font-weight: bolder;
    height: 100%;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
`;

const TableBody = styled.tbody`
  background-color: #363636;
  color: white;

  & tr {
    height: 30px;
  }
`;

export { TableHead, TableBody };
