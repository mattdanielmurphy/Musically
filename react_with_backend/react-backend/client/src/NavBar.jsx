
import React, { Component } from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'


class NavBar extends Component {
  constructor(props){
    super(props);
  }

  handleLogout = props => {
    this.props.updateCurrentUser(null);
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
                <Link to='/' className='nav-link'>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/composeGrid" className="nav-link">Compose</Link>
              </li>
              <li className='nav-item'>
                <p>Logged in as {this.props.currentUser && this.props.currentUser.username}</p>
              </li>
              <li className='nav-item'>
                <button className='logout' onClick={this.handleLogout}>Logout</button>
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
                <Link to='/' className='nav-link'>Home</Link>
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