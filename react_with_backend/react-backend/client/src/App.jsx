import React from 'react';


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';

import './App.css'


import Home from './routes/Home';
import PlayInstrument from './routes/PlayInstrument';
import ComposeGrid from './routes/ComposeGrid';
import SignIn from './routes/SignIn';
import Register from './routes/Register';

import TracksList from './routes/TracksList';


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
      currentTrack: [],
      currentCollectionId: null

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
  setUpCurrentTrack = (track) => {
    this.setState({
      currentTrack: track
    })
  }

  clearCurrentTrack = () => {
    this.setState({
      currentTrack: []
    })
  }

  setUpCollectionId = (id) => {
    this.setState({
      currentCollectionId: id
    })
  }


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

          <NavBar currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} />
          <Switch>
            <Route path='/' exact render={ ({match, history, location}) => <Home users={this.state.users} systemMusicFiles={this.state.systemMusicFiles} currentUser={this.state.currentUser} setUpCollectionId={this.setUpCollectionId.bind(this)} /> } />
            <Route path='/instrument' exact render={() => <PlayInstrument />} />
            <Route path='/composegrid' exact render={(props) => <ComposeGrid {...props} currentTrack={this.state.currentTrack} clearCurrentTrack={this.clearCurrentTrack} />} />
            <Route path='/trackslist' exact render={(props) => <TracksList {...props} currentCollectionId={this.state.currentCollectionId} setUpCurrentTrack={this.setUpCurrentTrack} /> } />

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;

