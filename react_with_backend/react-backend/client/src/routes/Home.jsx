import React from 'react';
import { Link } from 'react-router-dom';
import MusicList from '../MusicList';
import NavBar from '../NavBar';
import SingleCollection from '../SingleCollection';
import '../users.css'
import '../App.css'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      userCollection: [],
      collectionId: null
    };
  }

  setCollectionId(id) {
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
        <article className="wrapper">
          <h1>Welcome to Musically!</h1>
          <p className="welcome">With Musically, you can create your very own music. Click on the grid to add a note. Click and drag to add a note with duration. Then click play and hear the magic!</p>
          <footer>
            {/*<Link to="/instrument">instrument</Link>*/}
            <Link to="/composeGrid">Compose a Song</Link>
          </footer>
        </article>
      )
    } else {
      return(
        <article className='wrapper'>
          <h1>Welcome, {this.props.currentUser.username}. This your Music Space</h1>
          <br />
          <h3>My Awesome collections</h3>
          <br />
          {this.state.userCollection.map((item) => {
            return <SingleCollection key={item.id} item={item} setCollectionId={this.setCollectionId.bind(this)} />
          })}
        </article>
      )
    }
  }
}
export default Home;


