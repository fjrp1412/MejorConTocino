import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const FormUI = styled.form`
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 700px;
  color: black;
  align-items: center;
  background-color: #d0d2db;
  justify-content: center;
  border-radius: 25px;
  padding-top: 15px;

  & input {
    margin: 5px 0px 20px;
    height: 50px;
    width: 250px;
    border-radius: 25px;
  }

  & button {
    width: 150px;
    height: 50px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  & button {
    color: white;
    font-weight: bolder;
    font-size: 16px;
  }
  & button:first-child {
    background-color: #4f4bdb;
  }

  & button:last-child {
    background-color: #db4b4b;
  }
`;

const Form = ({
  handleCancel,
  apiMethod,
  name,
  state,
  country,
  type_food,
  rating,
  visited,
  id,
}) => {
  const handleSubmit = async () => {
    const { response } = id ? await apiMethod(id) : await apiMethod();

    console.log(response);

    if (response.status === 201 || response.status === 200) {
      location.reload();
    }
  };
  return (
    <FormUI id="form">
      <span>Nombre</span>
      <input type="text" name="name" id="name" defaultValue={name} />

      <span>Estado</span>
      <input type="text" name="state" defaultValue={state} />

      <span>Pais</span>
      <input type="text" name="country" defaultValue={country} />

      <span>Tipo</span>
      <input type="text" name="type_food" defaultValue={type_food} />

      <span>Calificacion</span>
      <input type="number" name="rating" defaultValue={rating} />

      <span>Visitado</span>
      <input
        type="radio"
        id="visited"
        defaultChecked={visited}
        name="is_visited"
        value="1"
      />

      <span>No visitado</span>
      <input
        type="radio"
        defaultChecked={!visited}
        name="is_visited"
        value="0"
      />

      <ButtonGroup>
        <Button handleClick={handleSubmit}>Enviar</Button>
        <Button handleClick={handleCancel}>Cancelar</Button>
      </ButtonGroup>
    </FormUI>
  );
};

export { Form };
