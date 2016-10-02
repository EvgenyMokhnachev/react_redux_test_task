import React from 'react';
import styles from './styles.css';

function Contact(props) {

  var contactItemClasses = styles.ContactItem;
  props.filter(props.contact) && (()=>{
    contactItemClasses += ' ' + styles.hide;
  })();

  return (
    <div className={contactItemClasses}>
      <div className={styles.ContactColumn}>{props.contact.name}</div>
      <div className={styles.ContactColumn}>{props.contact.phone}</div>
    </div>
  );

}

Contact.propTypes = {
  contact: React.PropTypes.object.isRequired,
  filter: React.PropTypes.func.isRequired
};

export default Contact;