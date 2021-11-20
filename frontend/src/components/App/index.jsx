import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Table } from '../Table';
import { TableItem } from '../TableItem';
import { TableHead, TableBody } from '../Table/TableComponentsUI';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Form } from '../Form';

import {
  getRestaurantList,
  postRestaurant,
  filterRestaurant,
} from '../../utils/Api';

const AppUI = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const FiltersContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  flex-direction: column;

  & div {
    display: flex;
    color: white;
    align-items: center;
    font-size: 20px;
  }

  & div input {
    margin: 5px 5px 20px;
    height: 25px;
    width: 200px;
    border-radius: 25px;
    padding: 5px;
  }

  & div span input {
    width: 25px;
    margin: 0px 15px;
  }
`;

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [searchedName, setSearchedName] = useState('');
  const [query, setQuery] = useState({});

  useEffect(async () => {
    const request = await getRestaurantList();
    setRestaurants(request.data);
  }, []);

  useEffect(() => {
    setFilteredRestaurants([...restaurants]);
  }, [restaurants]);

  useEffect(() => {
    if (!searchedName.length > 0) {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(
        restaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchedName.toLowerCase())
        )
      );
    }
  }, [searchedName]);

  const handleFilterName = event => {
    setSearchedName(event.target.value);
  };

  const handleQueryFilter = async () => {
    const { data } = await filterRestaurant({ ...query });
    setRestaurants([...data]);
  };

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
      <FiltersContainer>
        <div>
          <span>Nombre</span>
          <input type="text" onChange={handleFilterName} />
        </div>
        <div>
          <span>Estado</span>
          <input
            type="text"
            onChange={event => {
              setQuery({ ...query, state: event.target.value });
            }}
          />
        </div>
        <div>
          <span>Pais</span>
          <input
            type="text"
            onChange={event => {
              setQuery({ ...query, country: event.target.value });
            }}
          />
        </div>
        <div>
          <span>Tipo</span>
          <input
            type="text"
            onChange={event => {
              setQuery({ ...query, type: event.target.value });
            }}
          />
        </div>
        <div>
          <span>Calificacion</span>
          <input
            type="number"
            onChange={event => {
              setQuery({ ...query, rating: event.target.value });
            }}
          />
        </div>
        <div className="radio-container">
          <div className="radio-button">
            <span>
              Visitado
              <input type="radio" name="is_visited" value="1" />
            </span>
          </div>
          <div className="radio-button">
            <span>
              No visitado
              <input type="radio" name="is_visited" value="0" />
            </span>
          </div>
        </div>
      </FiltersContainer>

      <ButtonGroup>
        <Button handleClick={handleQueryFilter}>
          <i className="fas fa-search fa-3x " />
        </Button>
      </ButtonGroup>

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
      <Button
        handleClick={() => {
          setOpenModal(true);
        }}
      >
        <i className="fas fa-plus-circle fa-3x" />
      </Button>

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
