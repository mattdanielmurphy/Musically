import React from 'react';
import './PlayPiano.css';
import Tone from 'tone';
import { Link } from 'react-router-dom'

class PlayPiano extends React.Component {

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

  makeSound = event => {
    this.synth.triggerAttack(event.target.id);
  }

  stopSound = event => {
    this.synth.triggerRelease(event.target.id);
  }

  render() {
    return(
      <div id='piano'>
          <ul className="set">
            <li className="white b key-board" id="F1" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black as key-board" id="F#1" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white a key-board" id="G1" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black gs key-board" id="G#1" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white g key-board" id="A1" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black fs key-board" id="A#1" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white f key-board" id="B1" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white e key-board" id="C2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black ds key-board" id="C#2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white d key-board" id="D2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black cs key-board" id="D#2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white c key-board" id="E2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>

            <li className="white q key-board" id="F2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black ws key-board" id="F#2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white w key-board" id="G2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black rs key-board" id="G#2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white r key-board" id="A2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black ts key-board" id="A#2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white t key-board" id="B2" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white y key-board" id="C3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black us key-board" id="C#3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white u key-board" id="D3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black is key-board" id="D#3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white i key-board" id="E3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>

            <li className="white h key-board" id="F3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black js key-board" id="F#3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white j key-board" id="G3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black ks key-board" id="G#3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white k key-board" id="A3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black ls key-board" id="A#3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white l key-board" id="B3" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white m key-board" id="C4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black ns key-board" id="C#4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white n key-board" id="D4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black os key-board" id="D#4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white o key-board" id="E4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>

            <li className="white p key-board" id="F4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black ss key-board" id="F#4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white s key-board" id="G4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black vs key-board" id="G#4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white v key-board" id="A4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black xs key-board" id="A#4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white x key-board" id="B4" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white z key-board" id="C5" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black aas key-board" id="C#5" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white aa key-board" id="D5" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="black bbs key-board" id="D#5" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white bb key-board" id="E5" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
            <li className="white cc key-board" id="F5" onMouseDown={this.makeSound} onMouseUp={this.stopSound}></li>
          </ul>
          <Link to='/'><h3>Back to Home</h3></Link>
      </div>
    )
  }
}

export default PlayPiano;