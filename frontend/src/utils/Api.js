const getRestaurantList = async () => {
  const response = await fetch('http://localhost:8000/api/restaurant/');
  const data = await response.json();
  return { data };
};

export { getRestaurantList };
