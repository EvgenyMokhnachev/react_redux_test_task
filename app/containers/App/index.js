import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadContacts, changeFilter } from '../../actions';

import Filters from '../../components/Filters';
import Contacts from '../../components/Contacts';

import styles from './styles.css';

export class App extends React.Component {

  componentWillMount(){
    this.props.loadContacts();
  }

  _changeFilter(value){
    console.log(value);
    this.props.changeFilter(value);
  }

  _filter(contact){
    let filter = this.props.filter;
    let result = !(filter.name || filter.phone);
    if(!result) {
      let byName = filter.name &&
        contact.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1;
      let byPhone = filter.phone &&
        contact.phone.toLowerCase().indexOf(filter.phone.toLowerCase()) > -1;
      result = filter.name && filter.phone ? byName && byPhone : byName || byPhone;
    }
    return !result;
  }

  render(){
    return (
      <div className={styles.contactsApp}>
        <Filters onChange={this._changeFilter.bind(this)}/>
        <Contacts filter={this._filter.bind(this)} contacts={this.props.contacts} />
      </div>
    );
  }

}

export default connect(
  (state) => { return state },
  (dispatch) => bindActionCreators({loadContacts, changeFilter}, dispatch)
)(App);