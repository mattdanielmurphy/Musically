import React from 'react';
import { Link } from 'react-router-dom';

class ComposeGrid extends React.Component {
  render(){
    return(
      <div>
        <h1>Compose Grid goes to compose component</h1>
        <Link to='/'>Back to Home</Link>
      </div>
    )
  }
}

export default ComposeGrid;