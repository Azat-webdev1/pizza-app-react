import React from 'react';

import style from './Categories.module.scss';

const categories = ['Все', 'Острые', 'Закрытые', 'Гриль', 'Мясные', 'Вегетарианская'];

export const Categories = React.memo(({ value, onChangeCategory }) => {
  return (
    <div className={style.categories}>
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? `${style.active}` : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
