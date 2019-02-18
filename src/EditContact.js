import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as ContactsAPI from './ContactsAPI'
class EditContact extends Component {
  emptyItem = {
    firstName: '',
    lastName: '',
    age: '',
    photo: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    const listData = {
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      photo: item.photo
    }
    ContactsAPI.edit(item.id,listData)
    this.props.history.push('/');
  }

  componentDidMount() {
    ContactsAPI.getById(this.props.match.params.id).then((contacts) => {
      this.setState({item:contacts})
    })
}

handleChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  let item = {...this.state.item};
  item[name] = value;
  this.setState({item});
}

  render() {
    const {item} = this.state;
    console.log(item.firstName)
    return (
      <div>
        <Link className="close-create-contact" to="/">Close</Link>
        <form className="create-contact-form" onSubmit={this.handleSubmit}>
          <div className="create-contact-details">
            <input type="text" name="firstName" value={item.firstName} onChange={this.handleChange}/>
            <input type="text" name="lastName" value={item.lastName} onChange={this.handleChange}/>
            <input type="text" name="age" value={item.age} onChange={this.handleChange}/>
            <input type="text" name="photo" value={item.photo} onChange={this.handleChange}/>
            <button> Edit Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default EditContact