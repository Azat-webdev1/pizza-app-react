import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import style from './FullPizza.module.scss';


const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/pizzaLists/` + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img className={style.img} src={pizza.imageUrl} alt='' />
      <h2 className={style.title}>{pizza.title}</h2>
      <h4 className={style.price}>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
