import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
      </div>
    )
  }
}

export default App;
