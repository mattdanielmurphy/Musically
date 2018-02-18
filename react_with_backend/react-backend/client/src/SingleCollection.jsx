import React from 'react';

import { Link } from 'react-router-dom'

class SingleCollection extends React.Component {

  handleOnClick = (id, event) => {
    this.props.setCollectionId(id)
  }

  collectionDisplay = props => {

    return(
      <div class='collection'>
        <h2>Name: {this.props.item.name}</h2>
        <p>Description: {this.props.item.description}</p>
        <Link class='button' to="/tracksList"><button type='button' onClick={() => this.handleOnClick(this.props.item.id)}>View tracks in this Collection</button></Link>
      </div>
    )
  }

  render(){
    return(<div>{this.collectionDisplay()}</div>)
  }

}

export default SingleCollection;