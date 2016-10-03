import React from 'react';
import styles from './styles.css';

function ContactForm(props) {

  var nameInputClass = styles.ContactFormInput,
    phoneInputClass = styles.ContactFormInput;

  for(let i in props.errors){
    if(i === 'name') nameInputClass += (' ' + styles.ContactFormInputError);
    if(i === 'phone') phoneInputClass += (' ' + styles.ContactFormInputError);
  }

  return (
    <form className={styles.ContactForm} onSubmit={props.onSubmit}>
      <div className={styles.ContactFormInputBlock}>
        <input className={nameInputClass} name="name" type="text" placeholder="Enter new contact name"/>
      </div>
      <div className={styles.ContactFormInputBlock}>
        <input className={phoneInputClass} name="phone" type="phone" placeholder="Enter new contact phone"/>
      </div>
      <div className={styles.ContactFormSubmitBtnBlock}>
        <input className={styles.ContactFormSubmitBtn} type="submit" value={'Add'}/>
      </div>
    </form>
  );

}

ContactForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default ContactForm;