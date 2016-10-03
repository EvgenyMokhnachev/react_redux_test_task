import request from './utils/request';

export function getContacts() {
  return request('/api/phones');
}

export function setContact(name, phone) {
  return request('/api/phones', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, phone
    })
  })
}

export function rmContact(contact) {
  return request('/api/phone/' + contact._id, {
    method: 'DELETE'
  })
}