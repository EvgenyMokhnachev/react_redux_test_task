import React from 'react';
import styles from './styles.css';
import Filter from '../../components/Filter';

function Filters(props) {

  return (
    <div className={styles.filterBlock}>
      <Filter name={'name'} onChange={props.onChange} placeholder={"Filter by name"} />
      <Filter name={'phone'} onChange={props.onChange} placeholder={"Filter by phone"} />
    </div>
  );

}

export default Filters;