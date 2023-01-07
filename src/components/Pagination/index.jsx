import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';


export const Pagination = () => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={0}
  />
);
