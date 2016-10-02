import React from 'react';
import Contact from '../../components/Contact';

function Contacts(props) {

  return (
    <div>
      {props.contacts.map((contact, key)=>
        <Contact key={key} contact={contact} filter={props.filter}/>
      )}
    </div>
  );

}

Contacts.propTypes = {
  contacts: React.PropTypes.array.isRequired,
  filter: React.PropTypes.func.isRequired
};

export default Contacts;