import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// subclassing the input:
class NumericInput extends Input { //---------EXTENDS >INPUT<--------------
  field = () => {
    return (
      // HARDCODED to be type 'number'
      <input type='number' name={this.props.name} id={this.fieldId()} onChange={this.props.onChange}/>
    )
  }
}

class CheckboxInput extends Input { //---------EXTENDS >INPUT<--------------
  field = () => {
    return (
      // HARDCODED to be type 'number'
      <input type='checkbox' name={this.props.name} id={this.fieldId()} onChange={this.props.onChange}/>
    )
  }
}

// Adding form fields as sub components to move responsibility out of the app component and into subcomponents:
class Input extends Component {
  fieldId = () => {
    return `field-${this.props.name}`
  }

  // more reuse by making the types of input configurable. The output will be overwritten by a subclass.
  field = () => {
    return (
      <input type='text' name={this.props.name} id={this.fieldId()} onChange={this.props.onChange}/>
    )
  }
  render() {
    return (
      <div className='App-field'>
        <label className='App-label' htmlFor={this.fieldId()}>{this.props.label}</label> /*this.props.label to generalize and re-use this component*/
        {this.field()}
      </div>
    )
  }
}





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

  updateField = ({target}) => {
    const name = target.name
    let value = target.value
    if (target.type === 'number') {
      value = parseInt(value, 10)
    } else if (target.type === 'checkbox') {
      value = target.checked
    }
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="App">
        <Input name='username' label='Your Username' onChange={this.updateField}/>
        <NumericInput name='quantity' label='Quantity' onChange={this.updateField}/>

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

        <CheckboxInput name='mailing-list' label='Our Mailing List' onChange={this.updateField}/>


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
