import React from 'react';

import { Link } from 'react-router-dom'

class SingleCollection extends React.Component {

  handleOnClick = (id, event) => {
    this.props.setCollectionId(id)
  }

  collectionDisplay = props => {

    return(
      <div>
        <h1>Name: {this.props.item.name}</h1>
        <p>Description: {this.props.item.description}</p>
        <button type='button' onClick={() => this.handleOnClick(this.props.item.id)}><Link to="/tracksList">View tracks in this Collection</Link></button>

      </div>
    )
  }

  render(){
    return(<div>{this.collectionDisplay()}</div>)
  }

}

export default SingleCollection;