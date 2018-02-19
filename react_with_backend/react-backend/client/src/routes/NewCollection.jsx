import React from 'react';
import { Link } from 'react-router-dom';

class NewCollection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collectionName: '',
      description: ''
    }
    this.handleClick = this.handleOnClick.bind(this);
  }

  handleOnClick = event => {
    this.props.history.push('/');
  }

  handleChange = (key) => (event) => {
    this.setState({[key]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;
    var userId = self.props.currentUser.id;
    fetch('/users/newCollection',{
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        collectionName: self.state.collectionName,
        description: self.state.description
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(newcollection => {
      console.log('newcollection', newcollection[0])
      // This will push us to the home page
      self.props.history.push("/")

      // We need to also pass this login info to all the components that care about it
    })
  }

  render(){
    return(
      <article className="wrapper">
        <form className='form' onSubmit={this.handleSubmit}>
          <h1 className='form-newcollection-heading'>Create A New Collection</h1>
          <label htmlFor='name' className='sr-only'></label>
          <input type='text' id='collectionName' className='form-control' placeholder='Collection Name' onChange={this.handleChange('collectionName')} reuqired autoFocus/>
          <label htmlFor='description' className='sr-only'></label>
          <input type='text' id='description' className='form-control' placeholder='Describe your collection' onChange={this.handleChange('description')} reuqired autoFocus/>
          <button className='btn btn-lg btn-primary btn-block' type='submit'>Create</button>
        </form>
        <button onClick={this.handleClick} >Back to My Profile</button>
      </article>
    )
  }
}


export default NewCollection;