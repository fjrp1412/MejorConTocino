import React, { useState, useEffect } from 'react';
import { AppUI } from './AppUI';

import {
  getRestaurantList,
  postRestaurant,
  filterRestaurant,
} from '../../utils/Api';

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
    <AppUI
      handleFilterName={handleFilterName}
      query={query}
      setQuery={setQuery}
      handleQueryFilter={handleQueryFilter}
      openModal={openModal}
      postRestaurant={postRestaurant}
      setOpenModal={setOpenModal}
      filteredRestaurants={filteredRestaurants}
      handleSort={handleSort}
    />
  );
};

export { App };
