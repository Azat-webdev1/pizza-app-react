import axios from 'axios';
import React, { useState } from 'react';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';


const Home = () => {
  const [pizzaLists, setPizzaLists] = useState([]);

  React.useEffect(() => {
    const fetchPizzaLists = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/pizzaLists/`, {
          params: {
            _limit: 6,
            _page: 1,
          }
        });
        setPizzaLists(res.data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
      }
    }
    fetchPizzaLists();
  }, []);

  const pizzas = pizzaLists.slice(0, 8).map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={0} onChangeCategory={function (idx) {
          throw new Error('Function not implemented.');
        } } />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzas}</div>
        <Pagination />
    </div>
  );
};

export default Home;
