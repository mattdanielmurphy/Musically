import React, {Component} from 'react'
import '../notegrid.css'

class NoteGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      noteSequence: ['B', 'A', 'G', 'F', 'E', 'D', 'C'],
      baseNote: '16n',
      gridBeats: 4,
      octaveRange: {
        min: 4,
        max: 6
      },
      song: {}
    }
  }

  notePositions() {
    let notePositions = []
    let gridBeats = this.state.gridBeats
    let numPositions = gridBeats * 4
    for (let i = 1; i <= numPositions; i++) {
      if (i % gridBeats === 0) {
        notePositions.push(<div className={`position ${i} barEnd`}></div>)
      } else {
        notePositions.push(<div className={`position ${i}`}></div>)
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
          <div className={`noteRow ${note}${octave}`}>
           <div className="noteName">{`${note}${octave}`}</div>
             {this.notePositions()}
          </div>
        )
      })
    }
    return grid
  }

  saveNote() {
    let song = [
      {
        c4: '4n'
      }
    ]
    this.setState({song})
  }

  render() {
    return (
      <div className="noteGrid">{this.generateGrid()}</div>
    )
  }
}

export default NoteGrid