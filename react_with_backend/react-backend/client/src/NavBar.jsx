
import React, { Component } from 'react'
import './navbar.css'


class NavBar extends Component {
  constructor(props){
    super(props);
  }

  handleLogout = props => {
    this.props.updateCurrentUser(null);
    this.props.history.push('/');
  }

  navbarDisplay = props => {
    if(this.props.currentUser){
      return(
        <nav>
          <a href='/' className='navbar-brand'>
            <img src='musically-logo.svg' height='50' width='80'/>
          </a>
          <div className='navbar' id="navbarNav">
            <ul>
              <li className='nav-item'>
                <a className='nav-link' href='/'>Home</a>
              </li>
              <li className='nav-item'>
                <p>Logged in as {this.props.currentUser && this.props.currentUser.username}</p>
              </li>
              <li className='nav-item'>
                <a className='nav-link' onClick={this.handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      )
    } else {
      return(
        <nav>
          <a href='/' className='navbar-brand'>
            <img src='musically-logo.svg' height='50' width='80'/>
          </a>
          <div className='navbar' id='navbarNav'>
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
              <li className="nav-item">
                <a href="/composeGrid" className="nav-link">Compose</a>
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