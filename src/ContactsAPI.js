const api = process.env.REACT_APP_CONTACTS_API_URL || 'https://simple-contact-crud.herokuapp.com'

const headers = {
  'Accept': 'application/json',
}

export const getAll = () =>
  fetch(`${api}/contact`, { headers })
    .then(res => res.json())
    .then(data => data.data)

 export const getById = (id) =>
  fetch(`${api}/contact/${id}`, { headers })
    .then(res => res.json())
    .then(data => data.data)

export const remove = (contact) =>
  fetch(`${api}/contact/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.data)

export const create = (body) =>
  fetch(`${api}/contact`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const edit = (id,contact) =>
  fetch(`${api}/contact/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  }).then(res => res.json())