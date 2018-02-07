import React from 'react';

<<<<<<< Updated upstream
import NavBar from './NavBar.js';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

=======
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar.js';

import './app.css'
>>>>>>> Stashed changes
import Home from './routes/Home';
import PlayInstrument from './routes/PlayInstrument';
import ComposeGrid from './routes/ComposeGrid';
import SignIn from './routes/SignIn';
import Register from './routes/Register';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      systemMusicFiles: [],
      users: [],
      currentUser: null,
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
    .then(users => this.setState({ users: users}))


    // .then(console.log('users :', this.state.users))

    // fetch('/login/:id')
    // handle login
    // set currentUser if logged in
  }

  updateCurrentUser = (data) => {
    this.setState({currentUser: data })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} />
          <Switch>
            <Route path='/' exact render={ ({match, history, location}) => <Home users={this.state.users} systemMusicFiles={this.state.systemMusicFiles} /> } />
            <Route path='/instrument' exact render={() => <PlayInstrument />} />
            <Route path='/composegrid' exact render={()=><ComposeGrid />} />
            <Route path='/signin' exact render={(props)=> <SignIn {...props} updateCurrentUser={this.updateCurrentUser} />} />
            <Route path='/register' exact render={()=> <Register />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;

