import React from 'react';

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

  render(){
    return (

      <form className='form-register'>
        <h2 className='form-register-heading'>Please Register</h2>
        <label htmlFor='username' className='sr-only'>User Name</label>
        <input type='username' id='username' className='form-control' placeholder='User Name' onChange={this.handleChange('username')} reuqired autoFocus />
        <label htmlFor='inputEmail' className='sr-only'>Email address</label>
        <input type='email' id='inputEmail' className='form-control' placeholder='Email address' onChange={this.handleChange('email')} required />
        <label htmlFor='inputPassword' className='sr-only'>Password</label>
        <input type='password' id='inputPassword' className='form-control' placeholder='Password' onChange={this.handleChange('password')} required />
        <button className='btn btn-lg btn-primary btn-block' type='button'>Register</button>
      </form>

    )
  }

}

export default Register;