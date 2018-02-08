import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar.js';

import './App.css'

import Home from './routes/Home';
import PlayInstrument from './routes/PlayInstrument';
import ComposeGrid from './routes/ComposeGrid';
import SignIn from './routes/SignIn';
import Register from './routes/Register';

// import cookie from 'react-cookies';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.onLogin = this.onLogin.bind(this)
    // this.onLogout = this.onLogout.bind(this)
    this.state = {
      systemMusicFiles: [],
      users: [],
      currentUser: null,
      // userId: cookie.load('userId'),
      login: false,
      register: false
    }
  }


  componentDidMount(){
    fetch('/systemMusicFiles')
    .then(res => res.json())
    .then(systemMusicFiles => this.setState({systemMusicFiles: systemMusicFiles}))
    fetch('/users')
    .then(res => res.json())
    .then(users => this.setState({ users: users }))



    // .then(console.log('users :', this.state.users))

    // fetch('/login/:id')
    // handle login
    // set currentUser if logged in
  }

  // onLogin(userId) {
  //   this.setState({ userId })
  //   cookie.save('userId', userId, { path: '/' })
  // }

  // onLogout() {
  //   cookie.remove('userId', { path: '/' })
  // }

  updateCurrentUser = (data) => {
    this.setState({currentUser: data })
  }

  render() {
    if(!this.state.currentUser){
      return (
        <BrowserRouter>
          <div>
            <NavBar currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} />
            <Switch>
              <Route path='/' exact render={ ({match, history, location}) => <Home currentUser={this.state.currentUser} users={this.state.users} systemMusicFiles={this.state.systemMusicFiles} /> } />
              <Route path='/instrument' exact render={() => <PlayInstrument />} />
              <Route path='/composegrid' exact render={()=><ComposeGrid />} />
              <Route path='/signin' exact render={(props)=> <SignIn {...props} updateCurrentUser={this.updateCurrentUser} />} />
              <Route path='/register' exact render={(props)=> <Register {...props} updateCurrentUser={this.updateCurrentUser} />} />
            </Switch>
          </div>
        </BrowserRouter>
      )
    }
    return (
      <BrowserRouter>
        <div>
          <NavBar currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} onLogout={this.onLogout} />
          <Switch>
            <Route path='/' exact render={ ({match, history, location}) => <Home users={this.state.users} systemMusicFiles={this.state.systemMusicFiles} currentUser={this.state.currentUser}/> } />
            <Route path='/instrument' exact render={() => <PlayInstrument />} />
            <Route path='/composegrid' exact render={()=><ComposeGrid />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;

