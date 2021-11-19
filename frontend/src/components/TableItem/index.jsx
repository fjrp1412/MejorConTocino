import React from 'react';

const TableItem = ({ name, state, country, type, rating, isVisited }) => {
  return (
    <tr>
      <th>{name}</th>
      <th>{state}</th>
      <th>{country}</th>
      <th>{type}</th>
      <th>{rating}</th>
      <th>{isVisited ? 'Visitado' : 'No visitado'}</th>
    </tr>
  );
};

export { TableItem };
