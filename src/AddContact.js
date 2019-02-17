import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
class AddContact extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const val = serializeForm(e.target, {hash: true})
    if (this.props.onCreateContact)
      this.props.onCreateContact(val)
  }
  render() {
    return (
      <div>
        <Link className="close-create-contact" to="/">Close</Link>
        <form className="create-contact-form" onSubmit={this.handleSubmit}>
          <div className="create-contact-details">
            <input type="text" name="firstName" placeholder="First Name"/>
            <input type="text" name="lastName" placeholder="Last Name"/>
            <input type="text" name="age" placeholder="Age"/>
            <input type="text" name="photo" placeholder="Photo URL"/>
            <button> Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}


export default AddContact
