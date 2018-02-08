import React from 'react';


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
          </div>
        )
      })
  }

  render(){
    return (
      <article className='wrapper'>
        <h3>Tracks in Collection</h3>
        <div>{this.tracksListDisplay()}</div>
      </article>
    )
  }

}

export default TrackList;