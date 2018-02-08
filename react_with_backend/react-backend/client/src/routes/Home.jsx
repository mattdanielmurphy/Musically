import React from 'react';
import { Link } from 'react-router-dom';
import MusicList from '../MusicList';
import NavBar from '../NavBar';
import SingleCollection from '../SingleCollection';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userCollection: [],
      collectionId: null
    };
  }

  setCollectionId(id){
    this.props.setUpCollectionId(id)
  }

  componentDidMount(){
    if(this.props.currentUser){
      let id = this.props.currentUser.id
      fetch(`/users/usermusic/${id}`)
      .then(res => res.json())
      .then(usermusic => this.setState({ userCollection: usermusic }))
    }
  }



  render() {
    console.log('systemMusicFiles:', this.props.systemMusicFiles)
    if(!this.props.currentUser){
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
      )
    } else {
      return(
        <div className='personalProfile'>
          <h1>Welcome, {this.props.currentUser.username}. This your Music Space</h1>
          {this.state.userCollection.map((item) => {
            return <SingleCollection key={item.id} item={item} setCollectionId={this.setCollectionId.bind(this)} />
          })}
          <footer>
            <Link to="/instrument">instrument</Link>
            <br />
            <Link to="/composeGrid">Compose Songs</Link>
          </footer>
        </div>
      )
    }
  }
}
export default Home;


