
import React from 'react'
import { Link } from 'react-router-dom'
import Tone from 'tone'
import '../notegrid.css'
let classNames = require('classnames');

class ComposeGrid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      noteSequence: ['B', 'A', 'G', 'F', 'E', 'D', 'C'],
      baseNote: '4n',
      gridBeats: 4,
      gridBars: 4,
      octaveRange: { min: 2, max: 4 },
      selectedInstrument: 'synthesizer',
      song: this.props.currentTrack || [],
      synth: new Tone.PolySynth().toMaster(),
      trackName: '',
      collectionName: '',
      userCollection:[]
    }
    this.handleChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSaveSong.bind(this);
    new Tone.Filter(350, 'lowpass', -24).toMaster()
  }

  componentDidMount(){
    if(this.props.currentUser){
      let id = this.props.currentUser.id
      fetch(`/users/usermusic/${id}`)
      .then(res => res.json())
      .then(usermusic => this.setState({ userCollection: usermusic }))
    }
  }

  getClassNames(pos, noteValue) {
    let note = null
    let song = this.state.song
    if (this.props.song) {
      song = this.props.song
    }
    let currentPos = song[pos - 1]
    let highlight = false
    if (this.state.highlight == pos) {
      highlight = true
    }
    // if position exists in song
    if (currentPos) {

      // if position in song has a note
      if (currentPos[noteValue]) {
        note = true
      // } else if (currentPos['continue']) {
        // note = true
      }
    }
    return classNames({
      note,
      highlight
    })
  }

  notePositions(noteValue) {
    let notePositions = []
    let gridBeats = this.state.gridBeats
    let gridBars = this.state.gridBars
    let numPositions = gridBeats * gridBars
    for (let pos = 1; pos <= numPositions; pos++) {
      if (pos % gridBeats === 0) {
        notePositions.push(
          <div
            className={`${this.getClassNames(pos, noteValue)} pos barEnd`}
            onMouseDown={e => this.handleMouseDown(noteValue, pos, e)}
            onMouseUp={e => this.handleMouseUp(noteValue, pos, e)}
            onMouseOver={e => this.handleMouseOver(noteValue, pos, e)}
          />
        )
      } else {
        notePositions.push(
          <div
            className={`${this.getClassNames(pos, noteValue)} pos`}
            onMouseDown={e => this.handleMouseDown(noteValue, pos, e)}
            onMouseUp={e => this.handleMouseUp(noteValue, pos, e)}
            onMouseOver={e => this.handleMouseOver(noteValue, pos, e)}
          />
        )
      }
    }
    return notePositions
  }

  generateGrid() {
    let grid = []
    let gridRows = []
    let octaveRange = this.state.octaveRange
    for (let octave = octaveRange.max; octave >= octaveRange.min; octave--) {
      this.state.noteSequence.forEach( (note, index) => {
        grid.push(
          <div className='noteRow' noteValue={`${note}${octave}`}>
           <div className="noteName">{`${note}${octave}`}</div>
             {this.notePositions(`${note}${octave}`)}
          </div>
        )
      })
    }
    return grid
  }

  handleOnChange = (key) => (event) => {
    this.setState({[key]: event.target.value});
  }

  handleMouseDown(noteValue, pos, e) {
    // only start note if not already a note in that position
    if (this.state.song[pos - 1]) {
      if (!this.state.song[pos - 1][noteValue]) {
        this.startNote(noteValue, pos, e)
      }
    } else {
      this.startNote(noteValue, pos, e)
    }
  }

  handleMouseUp(noteValue, pos, e) {
    // remove note if one already present; otherwise end note
    if (this.state.song[pos - 1]) {
      if (this.state.song[pos - 1][noteValue] && !this.state.currentNoteStartPos) {
        // console.log('remove note')
        this.removeNote(noteValue, pos)
      } else {
        this.endNote(noteValue, pos)
      }
    } else {
      this.endNote(noteValue, pos)
    }
    this.setState({currentNoteStartPos: null, currentNoteValue: null})
  }

  handleMouseOver(noteValue, pos, e) {
    let startPos = this.state.currentNoteStartPos
    let song = this.state.song
    if (startPos && this.state.currentNoteValue == noteValue) {
      if (song[pos - 1]) {
        song[pos - 1][noteValue] = 'continue'
      } else {
        song[pos - 1] = { [noteValue]: 'continue'}
      }
      this.setState({ song })
      this.endNote(noteValue, pos)
    }
  }

  endNote(noteValue, endPos) {
    let startPos = this.state.currentNoteStartPos
    if (noteValue == this.state.currentNoteValue) {
      this.saveNote(noteValue, startPos, endPos)
    }
  }

  startNote(noteValue, pos, e) {
    let now = Tone.now() + 0.1
    this.state.synth.triggerAttackRelease(noteValue, '8n', now)

    let currentNoteStartPos = pos
    let currentNoteValue = noteValue
    this.setState({currentNoteStartPos, currentNoteValue})
  }

  saveNote(noteValue, startPos, endPos) {
    let song = this.state.song
    if (typeof song[startPos - 1] !== 'object') {
      song[startPos - 1] = {}
    }

    song[startPos - 1][noteValue] = endPos
    this.setState({song})
    this.scheduleNotes()
  }

  removeNote(noteValue, pos) {
    let song = this.state.song
    delete song[pos - 1][noteValue]
    this.setState({song})
    this.scheduleNotes()
  }

  triggerNote(noteValue, duration, time, pos = null) {
    Tone.Transport.schedule(time => {
      if (pos) {
        Tone.Draw.schedule(() => {
          this.setState({highlight: [pos]})
        }, time)
      } else {
        this.state.synth.triggerAttackRelease(noteValue, duration, time)
      }
    }, time)
  }

  scheduleNotes() {
    let song = this.state.song
    let baseNote = this.state.baseNote
    let gridBeats = this.state.gridBeats
    let gridBars = this.state.gridBars

    Tone.Transport.loopEnd = `(${gridBeats * gridBars} * ${baseNote})+0.01`
    Tone.Transport.loop = true
    Tone.Transport.cancel()

    for (let n = 1; n <= (gridBeats * gridBars); n++) {
      this.triggerNote('', baseNote, `${n} * ${baseNote}`, n)
    }
    // console.log(song[0]['C4'])
    for (var noteStartPos = 0; noteStartPos < song.length; noteStartPos++) {
      for (let noteValue in song[noteStartPos]) {
        let noteEndPos = song[noteStartPos][noteValue]
        let duration = `${noteEndPos - noteStartPos} * ${baseNote}`
        if (noteEndPos == 'continue') {
          console.log(noteEndPos)
        } else {
          this.triggerNote(noteValue, duration, `${noteStartPos + 1} * ${baseNote}`)
        }
      }
    }
  }

  playSong() {
    this.setState({ playing: true })
    console.log(this.state.song)
    this.scheduleNotes()
    Tone.Transport.start()
  }

  stopSong() {
    Tone.Transport.stop()
    this.setState({
      highlight: null,
      playing: false
    })
  }

  clearSong() {
    if(this.props.currentTrack){
      this.props.clearCurrentTrack()
    }
    let song = []
    Tone.Transport.cancel()
    this.setState({song: [], highlight: null})
  }

  playing() {
    let playing = this.state.playing
    return classNames({
      playing
    })
  }

  handleSaveSong(event) {
    event.preventDefault();
    let self = this;
    let collectionName = self.state.collectionName;
    let name = self.state.trackName;
    let song = self.state.song;
    let userId = self.props.currentUser.id
    if(self.state.song.length > 0){
      fetch('/users/composeGrid',{
        method: 'POST',
        body: JSON.stringify({
          name: name,
          song: song,
          userId: userId,
          collectionName: collectionName
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(res => res.json())
      .then(newtrack => {
        console.log('newtrack:',newtrack[0])
        self.props.history.push("/")
      })
    } else {
      alert('Opps! Your Loop is empty, fill in something please.')
    }
  }

  renderCollectionOptions() {
    if(this.props.currentUser){
      return this.state.userCollection.map(collection => (
        <option key={collection.id} value={collection.id}>{collection.name}</option>
      ))

    }
  }

  render() {
    if(this.props.currentUser){

      return (
        <div>
          <div className="noteGrid">{this.generateGrid()}</div>
          <div id='options'>
            <button id='clear' onMouseDown={e => this.clearSong()}>Clear</button>
            <button id='play' className={this.playing( )} onClick={e => this.playSong()}>Play</button>
            <button id='stop' onClick={e => this.stopSong()}>Stop</button>
            <form id='save-loop' onSubmit={this.handleSubmit}>
              <h2>Save loop:</h2>
              <div>
                <label>Collection</label>
                <select value={this.state.collectionName} onChange={this.handleChange('collectionName')}>
                  <option></option>
                  { this.renderCollectionOptions() }
                </select>
              </div>
              <div>
                <label htmlFor='trackName'>Name</label>
                <input type='text' onChange={this.handleChange('trackName')}/>
                <button type='submit'>Save</button>
                <button><Link to='/tracksList'>Back to collection</Link></button>
              </div>
            </form>
            {/*<label for="instrument">Select Instrument:</label>
            <select name="instrument" id="instrument-selector">
              <option value="synthesizer">Synthesizer</option>
              <option value="drums" selected>Drum Kit</option>
            </select>*/}
            {/*<div id="envelope">
              <label for="attack">attack</label>
              <input id='attack' type="number" value='0.2' step='0.1'>

              <label for="decay">decay</label>
              <input id='decay' type="number" value='0.5' step='0.1'>

              <label for="sustain">sustain</label>
              <input id='sustain' type="number" value='0.5' step='0.1'>

              <label for="release">release</label>
              <input id='release' type="number" value='1.0' step='0.1'>
            </div>*/}
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div className="noteGrid">{this.generateGrid()}</div>
          <div id='options'>
            <button id='clear' onMouseDown={e => this.clearSong()}>Clear</button>
            <button id='play' className={this.playing( )} onClick={e => this.playSong()}>Play</button>
            <button id='stop' onClick={e => this.stopSong()}>Stop</button>
          </div>
        </div>
      )
    }
  }
}

export default ComposeGrid;