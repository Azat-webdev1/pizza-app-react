import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store/';
import { selectFilter } from '../store/filter/selectors';
import { setCurrentPage } from '../store/filter/slice';
import { fetchPizzas } from '../store/pizza/asyncActions';
import { selectPizzaData } from '../store/pizza/selectors';

import {
  Categories,
  Pagination,
  PizzaBlock,
  Skeleton, 
  Sort
} from "../components";


const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { currentPage } = useSelector(selectFilter);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [currentPage]);

  const pizzas = items
    .slice(0, 8)
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={0}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage} 
      />
    </div>
  );
};

export default Home;
