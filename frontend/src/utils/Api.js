const getRestaurantList = async () => {
  const response = await fetch('http://localhost:8000/api/restaurant/');
  const data = await response.json();
  return { data };
};

const postRestaurant = async () => {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const objectFormData = Object.fromEntries(formData.entries());
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(objectFormData),
  };

  const response = await fetch(
    'http://localhost:8000/api/restaurant/',
    requestOptions
  );

  const data = await response.json();

  return { response, data };
};

const updateRestaurant = async id => {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const objectFormData = Object.fromEntries(formData.entries());
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(objectFormData),
  };

  const response = await fetch(
    `http://localhost:8000/api/restaurant/${id}/`,
    requestOptions
  );

  const data = await response.json();

  return { response, data };
};

const deleteRestaurant = async id => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  };

  const response = await fetch(
    `http://localhost:8000/api/restaurant/${id}/`,
    requestOptions
  );
  return { response };
};

const filterRestaurant = async ({ state, country, type, rating }) => {
  const url = 'http://localhost:8000/api/restaurant/?';
  const queryState = state ? `&state=${state}` : '';
  const queryCountry = country ? `&country=${country}` : '';
  const queryType = type ? `&type_food=${type}` : '';
  const queryRating = rating ? `&rating=${rating}` : '';

  const response = await fetch(
    url + queryState + queryCountry + queryType + queryRating
  );
  const data = await response.json();

  return { data };
};

export {
  getRestaurantList,
  postRestaurant,
  updateRestaurant,
  deleteRestaurant,
  filterRestaurant,
};
