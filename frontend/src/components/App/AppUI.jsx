import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Table } from '../Table';
import { TableItem } from '../TableItem';
import { TableHead, TableBody } from '../Table/TableComponentsUI';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Form } from '../Form';

const Container = styled.div`
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

const AppUI = ({
  handleFilterName,
  query,
  setQuery,
  handleQueryFilter,
  openModal,
  postRestaurant,
  setOpenModal,
  filteredRestaurants,
  handleSort,
}) => {
  return (
    <Container>
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
    </Container>
  );
};

export { AppUI };
