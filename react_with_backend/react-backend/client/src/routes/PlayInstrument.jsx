import React from 'react';
import PlayPiano from '../PlayPiano.js'

class PlayInstrument extends React.Component {
  render() {
    return (
      <div>
        <footer className='playInstrument'>
          <PlayPiano />
        </footer>
      </div>
    )
  }

}

export default PlayInstrument;