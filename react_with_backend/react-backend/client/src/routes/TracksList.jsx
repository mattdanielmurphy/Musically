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

  tracksListDisplay = () => {
    return this.state.tracks.map((track)=>{
        return(
          <div key={track.id}>
            <h3>Track Name: {track.name}</h3>
            <span>Created at {track.recorded_date}</span>
            <br />
            <span>Track notes: {track.path}</span>
          </div>
        )
      })
  }

  render(){
    return (
      <div>
        <h3>Tracks in Collection</h3>
        <div>{this.tracksListDisplay()}</div>
      </div>
    )
  }

}

export default TrackList;