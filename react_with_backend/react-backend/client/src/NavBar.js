import React, { Component } from 'react';


class NavBar extends Component {
  constructor(props){
    super(props);
  }

  navbarDisplay = props => {
    if(this.props.currentUser){
      return(
        <nav>
          <a href='/' className='navbar-brand'>Musically</a>
          <div className='collapse navbar-collapse' id="navbarNav">
            <ul>
              <li className='nav-item'>
                <a className='nav-link' href='/'>Home</a>
              </li>
              <li className='nav-item'>
                <p>Logged in as {this.props.currentUser}</p>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/'>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      )
    } else {
      return(
        <nav className='navbar navbar-toggleable-md navbar-light bg-faded' >
          <a href='/' className='navbar-brand'>Musically</a>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className='nav-link' href='/'>Home</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/signin'>Sign In</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/register'>Register</a>
              </li>
            </ul>
          </div>
        </nav>
      )
    }

  }

  render() {
    return(this.navbarDisplay())
  }

  // onButtonClick =  () => {
  //   fetch('/todo/meterla',{
  //   method: 'POST',
  //   body: JSON.stringify({
  //     task: self.refs.task.value
  //   }),
  //   headers: {"Content-Type": "application/json"}
  // })
  // .then(function(response){
  //   return response.json()
  // }).
  // }
}

export default NavBar;