import React from 'react';
import Music from './Music.js'
import Tone from 'tone';
import * as MidiConvert from 'midiconvert'

class MusicList extends React.Component {
  constructor(props){
    super(props)

    this.state={
      currentSong: null,
      playing: false
    }
  }

  componentDidMount(){
    this.synth = new Tone.PolySynth(8, Tone.Synth, {
          oscillator: {
              type: "sine3"
          },
          envelope: {
              attack: .03,
              decay: .1,
              sustain: .2,
              release: .6
          }
      }).toMaster()
  }

  playNote = (time, event) => {
    this.synth.triggerAttackRelease(event.name, event.duration, time, event.velocity)
  }

  playSystemMusic = (path) => (event) => {
    console.log('path',path);
    const _this = this;
    MidiConvert.load(path, function(midi) {
      // make sure you set the tempo before you schedule the events
      Tone.Transport.bpm.value = midi.header.bpm
      midi.tracks.forEach(function(track){
        // pass in the note events from one of the tracks as the second argument to Tone.Part
        var midiPart = new Tone.Part(this.playNote, track.notes).start(0)

      }, _this)
      // let playing = false;
      if (_this.state.playing) {
        // Move this to render
        Tone.Transport.pause();
        Tone.Transport.cancel();
        _this.setState(prevState => ({playing: !prevState.playing}));
      } else if(!_this.state.playing){
        // Start the music
        // TODO: Also move this to render
          Tone.Transport.start();
          _this.setState(prevState => ({playing: !prevState.playing}));
      } else {
        Tone.Transport.removeAll();
      }
    })

  }



  currentSongStateChange = (name) => {
    this.setState({currentSong: name})
  }

  render() {
    return (
      <div className='musics'>
        {this.props.systemMusicFiles.map(systemMusicFile => {
          return <Music key={systemMusicFile.id} playNote={this.playNote} systemMusicFile={systemMusicFile} currentSongStateChange={this.currentSongStateChange} currentSong={this.state.currentSong}/>
        })}
      </div>
    )
  }

  // playSong = (song) => {
  //   // TOOD: Play the given song
  // }
}

export default MusicList;