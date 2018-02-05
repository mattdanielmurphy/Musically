import React from 'react';

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var self = this;
    fetch('/users/login',{
      method: 'POST',
      body: JSON.stringify({
        email: self.state.email,
        password: self.state.password
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(data => {
      this.props.updateCurrentUser(data);


      // This will push us to the home page
      this.props.history.push("/")

      // We need to also pass this login info to all the components that care about it
      console.log(data)
    })
  }

  handleChange = (key) => (event) => {
    this.setState({[key]: event.target.value})
  }

  render(){
    return (

      <form className='form-signin' onSubmit={this.handleSubmit}>
        <h2 className='form-signin-heading'>Please sign in</h2>
        <label htmlfor='inputEmail' className='sr-only'>Email address</label>
        <input type='email' id='inputEmail' className='form-control' placeholder='Email address' onChange={this.handleChange('email')} required autofocus />
        <label htmlfor='inputPassword' className='sr-only'>Password</label>
        <input type='password' id='inputPassword' className='form-control' placeholder='Password' onChange={this.handleChange('password')} required />
        <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign In</button>
      </form>

    )
  }

}

export default SignIn;