import React from 'react';
import '../signin.css'

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleChange = (key) => (event) => {
    this.setState({[key]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;
    fetch('/users/register',{
      method: 'POST',
      body: JSON.stringify({
        email: self.state.email,
        password: self.state.password,
        username: self.state.username
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(newone => {
      self.props.updateCurrentUser(newone[0]);
      console.log('self.props:', self.props)


      // This will push us to the home page
      self.props.history.push("/")

      // We need to also pass this login info to all the components that care about it
      console.log(newone)
    })
  }

  render(){
    return (

      <article className="wrapper">
        <form className='form' onSubmit={this.handleSubmit}>
          <h2 className='form-register-heading'>Please Register</h2>
          <label htmlFor='username' className='sr-only'>User Name</label>
          <input type='username' id='username' className='form-control' placeholder='User Name' onChange={this.handleChange('username')} reuqired autoFocus />
          <label htmlFor='inputEmail' className='sr-only'>Email address</label>
          <input type='email' id='inputEmail' className='form-control' placeholder='Email address' onChange={this.handleChange('email')} required />
          <label htmlFor='inputPassword' className='sr-only'>Password</label>
          <input type='password' id='inputPassword' className='form-control' placeholder='Password' onChange={this.handleChange('password')} required />
          <button className='btn btn-lg btn-primary btn-block' type='submit'>Register</button>
        </form>
      </article>

    )
  }

}

export default Register;