import React from 'react';
import * as MidiConvert from 'midiconvert'
import Tone from 'tone';

class Music extends React.Component {
  constructor(props){
    super(props);
    this.state = {playing: false}
  }

  // componentDidMount(){
  //   this.synth = new Tone.PolySynth(8, Tone.Synth, {
  //         oscillator: {
  //             type: "sine3"
  //         },
  //         envelope: {
  //             attack: .03,
  //             decay: .1,
  //             sustain: .2,
  //             release: .6
  //         }
  //     }).toMaster()
  // }

  // playNote = (time, event) => {
  //   this.synth.triggerAttackRelease(event.name, event.duration, time, event.velocity)
  // }

  // isCurrentSong = (event) => {
  //   if (this.props.currentSong !== event.target.id ){
  //     Tone.Transport.stop()
  //     this.playSystemMusic(path)
  //   } else if (this.props.currentSong === event.target.id) {
  //     this.playSystemMusic(path)
  //   }
  // }

  playSystemMusic = (path) => (event) => {
    console.log('path',path);
    const _this = this;
    MidiConvert.load(path, function(midi) {

      // make sure you set the tempo before you schedule the events
      Tone.Transport.bpm.value = midi.header.bpm
      midi.tracks.forEach(function(track){
        // pass in the note events from one of the tracks as the second argument to Tone.Part
        var midiPart = new Tone.Part(this.props.playNote, track.notes).start(0)

      }, _this)
      // let playing = false;
      if (_this.state.playing) {
        // Move this to render
        Tone.Transport.stop();
        _this.setState(prevState => ({playing: !prevState.playing}));
      } else {
        // Start the music
        // TODO: Also move this to render
          Tone.Transport.start();
          _this.setState(prevState => ({playing: !prevState.playing}));
      }
    })

  }

  // handleOnClick = (event) => {
  //   if(event.target.innerHTML === 'Play'){
  //     event.target.innerHTML = 'Pause';
  //   } else {
  //     event.target.innerHTML = 'Play';
  //   }
  // }



  musicDisplay = props => {

      let path = `http://localhost:3001${this.props.systemMusicFile.location}`
      let text = this.state.playing ? 'Pause' : 'Play';
      return(
        <div className='systemMusicFile'>
          <span>name: {this.props.systemMusicFile.name}</span>
          <span>
            <a href= {path}>Download</a>
          </span>
          <button id={this.props.systemMusicFile.name} onClick={this.playSystemMusic(path)}>{text}</button>
        </div>
      )

  }

  render() {
    return (<div>{ this.musicDisplay() }</div>)
  }
}

export default Music;