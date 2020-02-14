import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props) //to make sure we don't break anything in the base class
    this.state = {
      username: '',
      quantity: 0,
      colors: [],
      'mailing-list': false
    }
  }
  stateJson = () => {
    return JSON.stringify(this.state)
  }

  render() {
    return (
      <div className="App">
        <div className='App-field'>
          <label className='App-label' htmlFor='field-username'>Your Username</label>
          <input type='text' name='username' id='field-username'/>
        </div>
        <div className='App-field'>
          <label className='App-label' htmlFor='field-quantity'>Your Username</label>
          <input type='number' name='quantity' id='field-quantity'/>
        </div>
        <div className='App-field'>
          <label className='App-label' htmlFor='field-colors'>Your Username</label>
          <select className='App-multi-select' name='colors' id='field-colors'>
            <option value='red'>Red</option>
            <option value='orange'>Orange</option>
            <option value='yellow'>Yellow</option>
            <option value='green'>Green</option>
            <option value='blue'>Blue</option>
            <option value='indigo'>Indigo</option>
            <option value='violet'>Violet</option>
          </select>
        </div>
        <div className='App-field'>
          <label className='App-label' htmlFor='field-mailing-list'>Join Our Mailing List</label>
          <input type='checkbox' name='mailing-list' id='field-mailing-list'/>
        </div>

        <div className='App-field'>
          <button className='App-button'>Submit</button>
        </div>

        <div className='App-field'>
          <textarea className='App-json' value={this.stateJson()} readOnly/>
        </div>
      </div>
    )
  }
}

export default App;
