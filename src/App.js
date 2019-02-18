import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactsAPI from './ContactsAPI'
import AddContact from './AddContact'
import EditContact from './EditContact'
class App extends Component {
  state = {
    screen: 'list',
    contacts: []

  }
/*
  componentDidMount() {
    console.log('jos')
      ContactsAPI.getAll().then((contacts) => {
        console.log(contacts)
        this.setState({contacts})
      })
  }
*/
  removeContact = (contact) => {
    this.setState((state) => ({
        contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
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
    <Switch>
      <Route exact path="/" render = {() => (
          // <ListContacts contacts = {this.state.contacts} onDeleteContact = {this.removeContact}
          // onNavigate = {() => {
          //   this.setState({screen: 'AddContact'})
          // }} />
          <ListContacts onDeleteContact = {this.removeContact}
          onNavigate = {() => {
            this.setState({screen: 'AddContact'})
          }} />
        )}/>
        
        <Route path="/AddContact" component={AddContact}/>
        <Route path="/EditContact/:id" component={EditContact}/>
    </Switch>
    </div>
    )
  }
}

export default App;
