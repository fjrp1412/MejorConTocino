import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Form } from '../Form';
import { updateRestaurant, deleteRestaurant } from '../../utils/Api';

const TableItem = ({ id, name, state, country, type, rating, isVisited }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    const { response } = await deleteRestaurant(id);

    if (response.status === 204) {
      location.reload();
    }
  };
  return (
    <>
      <tr>
        <th>{name}</th>
        <th>{state}</th>
        <th>{country}</th>
        <th>{type}</th>
        <th>{rating}</th>
        <th>
          {' '}
          <input type="checkbox" readOnly checked={isVisited} />{' '}
        </th>
        <th onClick={() => setOpenModal(true)}>
          <i className="fas fa-pen-square fa-lg pointer" />
        </th>
        <th onClick={handleDelete}>
          <i className="far fa-trash-alt fa-lg pointer" />
        </th>
      </tr>

      {openModal && (
        <Modal>
          <Form
            handleCancel={() => setOpenModal(false)}
            apiMethod={updateRestaurant}
            name={name}
            state={state}
            country={country}
            type_food={type}
            rating={rating}
            id={id}
            visited={isVisited}
          />
        </Modal>
      )}
    </>
  );
};

export { TableItem };
