import React from 'react';
import PlayPaino from '../PlayPaino.js'

class PlayInstrument extends React.Component {
  render() {
    return (
      <div>
        <footer className='playInstrument'>
          <PlayPaino />
        </footer>
      </div>
    )
  }

}

export default PlayInstrument;