import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactsAPI from './ContactsAPI'
import AddContact from './AddContact'
import EditContact from './EditContact'
class App extends Component {
  state = {
    screen: 'list',
    contacts: []

  }

  componentDidMount() {
      ContactsAPI.getAll().then((contacts) => {
        this.setState({contacts})
      })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
        contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  editContact = (contact) => {
    this.setState((state) => ({
        contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))

    ContactsAPI.edit(contact)
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact=>{
      this.setState(state =>({
        contacts: state.contacts.concat([contact])
      }))
    })
  }
  render() {
    return (<div className="app">
      <Route exact path="/" render = {() => (
        <ListContacts contacts = {this.state.contacts} onDeleteContact = {this.removeContact} onEditContact = {this.editContact}
        onNavigate = {() => {
          this.setState({screen: 'AddContact'})
        }} />
      )}/>
    <Route path="/AddContact" render = {({history}) => (
        <AddContact
          onCreateContact = {(contact) => {
            this.createContact(contact)
            history.push('/')
          }}
          />
      )}/>
      <Route path="/EditContact/:id" component={EditContact}/>
    </div>
    )
  }
}

export default App;
