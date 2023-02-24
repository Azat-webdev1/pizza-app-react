import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store/';
import { selectFilter } from '../store/filter/selectors';
import { setCategoryId, setCurrentPage } from '../store/filter/slice';
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
  const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  
  const onChangeCategory = React.useCallback((idx) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const search = searchValue;
    const category = categoryId > 0 ? String(categoryId) : '';
    const sortBy = sort.sortProperty.replace('-', '');
    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        search,
        category,
        sortBy,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [sort.sortProperty, currentPage, searchValue, categoryId]);

  const pizzas = items
    .filter((item) => item.title?.toLowerCase()
    .includes(searchValue.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory} 
        />
        <Sort value={sort} />
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
