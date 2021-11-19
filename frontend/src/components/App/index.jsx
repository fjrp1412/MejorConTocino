import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Table } from '../Table';
import { TableItem } from '../TableItem';
import { TableHead, TableBody } from '../Table/TableComponentsUI';

import { getRestaurantList } from '../../utils/Api';

const AppUI = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  justify-content: center;
`;

const App = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);

  useEffect(async () => {
    const request = await getRestaurantList();
    setFilteredRestaurants(request.data);
  }, []);

  const handleSort = field => {
    const sortedArray = [...filteredRestaurants].sort((a, b) => {
      setAscendingSort(!ascendingSort);
      if (a[field] < b[field]) {
        return ascendingSort ? -1 : 1;
      }

      if (a[field] > b[field]) {
        return ascendingSort ? 1 : -1;
      }

      return 0;
    });
    setFilteredRestaurants(sortedArray);
  };

  return (
    <AppUI>
      <Table>
        <TableHead>
          <tr>
            <th>
              <button type="button" onClick={() => handleSort('name')}>
                {' '}
                Nombre
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleSort('state')}>
                {' '}
                Estado
              </button>
            </th>

            <th>
              <button type="button" onClick={() => handleSort('country')}>
                {' '}
                Country
              </button>
            </th>

            <th>
              <button type="button" onClick={() => handleSort('type_food')}>
                {' '}
                Tipo
              </button>
            </th>

            <th>
              <button type="button" onClick={() => handleSort('rating')}>
                {' '}
                Calificacion
              </button>
            </th>

            <th>
              <button type="button" onClick={() => handleSort('is_visited')}>
                {' '}
                Visitado
              </button>
            </th>
          </tr>
        </TableHead>
        <TableBody>
          {filteredRestaurants.map(restaurant => (
            <TableItem
              name={restaurant.name}
              state={restaurant.state}
              country={restaurant.country}
              rating={restaurant.rating}
              type={restaurant.type_food}
              isVisited={restaurant.is_visited}
              key={restaurant.id}
            />
          ))}
        </TableBody>
      </Table>
    </AppUI>
  );
};

export { App };
