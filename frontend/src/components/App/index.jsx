import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Table } from '../Table';
import { TableItem } from '../TableItem';
import { TableHead, TableBody } from '../Table/TableComponentsUI';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Form } from '../Form';

import { getRestaurantList, postRestaurant } from '../../utils/Api';

const AppUI = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const App = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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
            <th>Editar</th>
            <th>Eliminar</th>
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
              id={restaurant.id}
            />
          ))}
        </TableBody>
      </Table>
      <ButtonGroup>
        <Button
          handleClick={() => {
            setOpenModal(true);
          }}
        >
          <i className="fas fa-plus-circle fa-3x" />
        </Button>
      </ButtonGroup>

      {openModal && (
        <Modal>
          <Form
            handleCancel={() => {
              setOpenModal(false);
            }}
            apiMethod={postRestaurant}
          />
        </Modal>
      )}
    </AppUI>
  );
};

export { App };
