import React from 'react';

class SingleCollection extends React.Component {
  collectionDisplay = props => {
    return(
      <div>
        <h1>Name: {this.props.item.name}</h1>
        <p>Description: {this.props.item.descrition}</p>
        <button>Checkout tracks in this Collection</button>
      </div>
    )
  }

  render(){
    return(<div>{this.collectionDisplay()}</div>)
  }

}

export default SingleCollection;