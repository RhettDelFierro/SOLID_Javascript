import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// subclassing the input:
class NumericInput extends Input { //---------EXTENDS >INPUT<--------------
  value = (target) => {
    return parseInt(target.value, 10)
  }
  field = () => {
    return (
      // HARDCODED to be type 'number'
      <input type='number' name={this.props.name} id={this.fieldId()} onChange={this.props.onChange}/>
    )
  }
}

class CheckboxInput extends Input { //---------EXTENDS >INPUT<--------------
  value = (target) => {
    return target.checked
  }
  field = () => {
    return (
      // HARDCODED to be type 'number'
      <input type='checkbox' name={this.props.name} id={this.fieldId()} onChange={this.onChange}/>
    )
  }
}

class ColorsInput extends Input { //---------EXTENDS >INPUT<--------------
  value = (target) => {
    let value = []
    Array.prototype.forEach.call(target.options, option => {
      if (option.selected) value.push(option.value)
    })
    return value
  }
  field = () => {
    return (
      // HARDCODED to be type 'number'
      <select className='App-multi-select'
              name={this.props.name}
              id={this.fieldId()}
              onChange={this.onChange} multiple
      >
        <option value='red'>Red</option>
        <option value='orange'>Orange</option>
        <option value='yellow'>Yellow</option>
        <option value='green'>Green</option>
        <option value='blue'>Blue</option>
        <option value='indigo'>Indigo</option>
        <option value='violet'>Violet</option>
      </select>
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
      <input type='text' name={this.props.name} id={this.fieldId()} onChange={this.onChange}/>
    )
  }

  value = (target) => {
    return target.value
  }

  onChange = (event) => {
    this.props.onChange(event, this.value(event.target))
  }

  render() {
    return (
      <div className='App-field'>
        <label className='App-label'
               htmlFor={this.fieldId()}>{this.props.label}</label> /*this.props.label to generalize and re-use this component*/
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

  updateField = ({target}, value) => {
    const name = target.name
    // let value = target.value

    /*
    * while this looks like an open closed principle violation, the root of this problem is a violation of the Liskov Substitution principle.
    * Meaning strong behavioral typing. Most mathematical and esoteric of the principles.
    *
    * formal definition:
    * "Let @[X] be a property PROVABLE about objects X of type T.
    * Then @[Y] should be true for objects Y of type S where S is a subtype of T."
    *
    * easier definition:
    * "Wherever an instance of a base class is used, you should be able to substitute it with an instance of a subclass
    * without breaking anything. In other words, a subclass should never break any contract that the base class has with it's users."
    *
    *
    *
    * */
    // if (target.type === 'number') {
    //   value = parseInt(value, 10)
    // } else if (target.type === 'checkbox') {
    //   value = target.checked
    // } else if (target.type === 'select-multiple') {
    //   value = []
    //   Array.prototype.forEach.call(target.options, option => {
    //     if (option.selected) value.push(option.value)
    //   })
    // }
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="App">
        <Input name='username' label='Your Username' onChange={this.updateField}/>
        <NumericInput name='quantity' label='Quantity' onChange={this.updateField}/>
        <ColorsInput name='colors' label='Colors Used' onChange={this.updateField}/>

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
