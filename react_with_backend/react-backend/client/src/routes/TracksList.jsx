import React from 'react';
import { Link } from 'react-router-dom';


class TrackList extends React.Component {
  constructor(props){
   super(props);
   this.state = {
     tracks: []
   };
  }

  componentDidMount(){
    fetch(`/users/tracks/${this.props.currentCollectionId}`)
    .then(res => res.json())
    .then(tracks => this.setState({ tracks: tracks }))
  }

  handleOnClick = (track,e) => {
    this.props.setUpCurrentTrack(track)
    this.props.history.push('/composeGrid')
  }

  tracksListDisplay = () => {
    return this.state.tracks.map((track)=>{
        return(
          <div key={track.id}>
            <h3>Track Name: {track.name}</h3>
            <span>Created at {track.recorded_date}</span>
            <br />
            <button onClick={() => this.handleOnClick(track.song)}>Play in Grid</button>
            <button>Delete</button>
          </div>
        )
      })
  }

  render(){
    if(!this.props.currentCollectionId){
      return(
        <article className='wrapper'>
          <h1>Opps! You did'nt pick a collection yet. Please pick one</h1>
          <button><Link to='/'>Find out your Collection</Link></button>
        </article>
      )
    } else {
      return (
        <article className='wrapper'>
          <h3>Tracks in Collection</h3>
          <div>{this.tracksListDisplay()}</div>
        </article>
      )

    }
  }

}

export default TrackList;