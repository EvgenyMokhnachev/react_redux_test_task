import React from 'react';
import styles from './styles.css';

function Filter(props) {

  function onChange(event) {
    let result = {};
    result[props.name] = event.currentTarget.value;
    props.onChange(result);
  }

  return (
    <div className={styles.filterField}>
      <input onKeyUp={onChange.bind(this)} className={styles.filterInput} placeholder={props.placeholder}/>
    </div>
  );

}

export default Filter;