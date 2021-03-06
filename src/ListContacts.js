import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as ContactsAPI from './ContactsAPI'

class ListContacts extends Component {
  static propTypes = {
   // contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: '',
    screen: 'list',
    contacts: []

  }

  componentDidMount() {
      ContactsAPI.getAll().then((contacts) => {
        this.setState({contacts})
      })
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }


  clearQuery = ()=> {
    this.setState({
      query: ''
    })
  }

  render() {
    const {onDeleteContact} = this.props
    const { contacts,query }  = this.state

    let shownContact
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      shownContact = contacts.filter((contact) => match.test(contact.firstName))
    }
    else {
      shownContact = contacts
    }

    shownContact.sort(sortBy('firstName'))
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}/>

          <Link to="/AddContact" className="add-contact">Add Contact</Link>
        </div>

        {shownContact.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {shownContact.length} of {contacts.length} total.</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {shownContact.map((contact) => (
            <li key= {contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.photo})`
              }}/>
              <div className="contact-details">
                <p>{contact.firstName} {contact.lastName}</p>
                <p>Age: {contact.age}</p>
              </div>
              <Link to={'/EditContact/'+contact.id} className="contact-edit">Edit</Link>
              <button className="contact-remove" onClick={() => onDeleteContact(contact)} >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }

}

export default ListContacts;
