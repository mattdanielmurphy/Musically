import React from 'react';
import { Link } from 'react-router-dom';
import MusicList from '../MusicList.js';
import NavBar from '../NavBar.js';

class Home extends React.Component {
  constructor(props){
    super(props)

  }

  // componentDidMount(){
  //   fetch('/systemMusicFiles')
  //   .then(res => res.json())
  //   .then(systemMusicFiles => this.setState({systemMusicFiles: systemMusicFiles}))
  //   fetch('/users')
  //   .then(res => res.json())
  //   .then(users => {this.setState({ users: users})})
  //   // .then(console.log('users :', this.state.users))

  //   // fetch('/login/:id')
  //   // handle login
  //   // set currentUser if logged in
  // }

  render() {
    console.log('systemMusicFiles:', this.props.systemMusicFiles)
    return (
      <div className="Home">
        <h1>Users</h1>
        {this.props.users.map(user =>
            <div key={user.id}>{user.username}</div>
        )}
        <MusicList systemMusicFiles={this.props.systemMusicFiles} />
        <footer>
          <Link to="/instrument">instrument</Link>
          <br />
          <Link to="/composeGrid">Compose Songs</Link>
        </footer>
      </div>
    );
  }
}
export default Home;
