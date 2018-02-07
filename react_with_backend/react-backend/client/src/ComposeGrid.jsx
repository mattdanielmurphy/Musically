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
      octaveRange: { min: 4, max: 5 },
      selectedInstrument: 'synthesizer',
      song: [],
      synth: new Tone.PolySynth().toMaster(),
      currentNote: {
        startPos: 1,
        endPos: 4,
        noteValue: 'C4'
      }
    }
  }

  getClassNames(pos, noteValue) {
    let note = false
    if (this.state.song[pos - 1]) {
      if (this.state.song[pos - 1][noteValue]) {
        note = true
      }
    }
    return classNames({
      'note': note
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
          />
        )
      } else {
        notePositions.push(
          <div
            className={`${this.getClassNames(pos, noteValue)} pos`}
            onMouseDown={e => this.handleMouseDown(noteValue, pos, e)}
            onMouseUp={e => this.handleMouseUp(noteValue, pos, e)}
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
    for (let octave = octaveRange.min; octave <= octaveRange.max; octave++) {
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

  handleMouseDown(noteValue, pos, e) {
    if (this.state.song[pos - 1]) {
      if (this.state.song[pos - 1][noteValue]) {
        // this.removeNote(noteValue, pos)
      } else {
        this.trackNoteDuration(noteValue, pos, e)
      }
    } else {
      this.trackNoteDuration(noteValue, pos, e)
    }
  }

  handleMouseUp(noteValue, pos, e) {
    if (this.state.song[pos - 1]) {
      if (this.state.song[pos - 1][noteValue]) {
        // console.log('remove note')
        this.removeNote(noteValue, pos)
      } else {
        this.endNote(noteValue, pos)
      }
    } else {
      this.endNote(noteValue, pos)
    }
  }

  endNote(noteValue, endPos) {
    let startPos = this.state.currentNoteStartPos
    this.saveNote(noteValue, startPos, endPos)
  }

  trackNoteDuration(noteValue, pos, e) {
    // console.log(e.mouseDown, e.mouseUp)
    let now = Tone.now() + 0.1
    this.state.synth.triggerAttackRelease(noteValue, '4n', now)
    let currentNoteStartPos = pos
    this.setState({currentNoteStartPos})
  }

  saveNote(noteValue, startPos, endPos) {
    let song = this.state.song
    let duration = endPos - startPos + 1

    if (typeof song[startPos - 1] !== 'object') {
      song[startPos - 1] = {}
    }

    song[startPos - 1][noteValue] = duration
    this.setState({song})
    this.scheduleNotes()
  }

  removeNote(noteValue, pos) {
    console.log('remoing note')
    let song = this.state.song
    delete song[pos - 1][noteValue]
    this.setState({song})
    this.scheduleNotes()
  }

  triggerNote(noteValue, duration, time) {
    Tone.Transport.schedule(time => {
      this.state.synth.triggerAttackRelease(noteValue, duration, time)
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
    // console.log(song[0]['C4'])
    for (var i = 0; i < song.length; i++) {
      for (let noteValue in song[i]) {
        let duration = `${song[i][noteValue]} * ${baseNote}`
        this.triggerNote(noteValue, duration, `${i + 1} * ${baseNote}`)
      }
    }
  }

  playSong() {
    this.scheduleNotes()
    Tone.Transport.start()
  }

  stopSong() {
    Tone.Transport.stop()
  }

  clearSong() {
    let song = []
    Tone.Transport.cancel()
    this.setState({song})
  }

  render() {
    return (
      <div>
        <div className="noteGrid">{this.generateGrid()}</div>
        <div id='options'>
          <button id='clear' onMouseDown={e => this.clearSong()}>Clear</button>
          <button id='play' onClick={e => this.playSong()}>Play</button>
          <button id='stop' onClick={e => this.stopSong()}>Stop</button>
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
        <Link to='/'>Back to Home</Link>
      </div>
    )
  }
}

export default ComposeGrid;