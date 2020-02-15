import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PaintDataClient from './paint-data-client'


/**
 * We can extract the logic of which client to use and separate it out into a new module.
 *
 * PaintDataClient MAY be a reference to either PaintJsClient or SuperInvestorClient.
 * App doesn't need to know which one it is.
 *
 * The weaknesses to this approach:
 * 1. You can only initialize the module once. Whatever is chosen when the App starts, that's what it's going to be.
 *    --To fix that slightly: rather than export a class you can export a function:
 *      export function getPaintDataClient() { return user.legacy ? new PainJsClient() : new SuperInvestorClient() }
 * 2. This would be more difficult to test.
 *    --In order to set up this situation, we would have to do one of a few things:
 *      a. mock these classes thoroughly and something like this is not 100% clear how you'd mock it out.
 *      b. more likely option: you'd stub out a bunch of stuff. In our case we'd have to set up the user so that it'd have a user.legacy true and false cases.
 *
 */

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorData: []
    }

    this.client = new PaintDataClient()
    this.fetchColorData()
  }

  fetchColorData = () => {
    this.client.fetchColorData().then(payload => {
      this.setState({
        colorData: payload.colors
      })
    })
  }

  updateColorCount = (id, count) => {
    this.client.updateColorCount(id, count).then(() => {
      this.setState({
        colorData: this.state.colorData.map(orig => {
          const updatedCount = orig.id === id ? count : orig.count
          return {
            id: orig.id,
            color: orig.color,
            count: updatedCount
          }
        })
      })
    })
  }

  render() {
    const {colorData} = this.state
    const hasData = colorData.length > 0
    return (
      <div className='color-app'>
        {!hasData && <p>Loading data...</p>}
        {hasData && <ColorRowGroup colorData={colorData} update={this.updateColorCount}>Loading data...</ColorRowGroup>}
      </div>
    )
  }
}

class ColorRowGroup extends Component {
  render() {
    return (
      <div className='color-row-group'>
        {
          this.props.colorData.map(({id, color, count}) =>
            <ColorRow id={id} color={color} cound={count} update={this.props.update}/>
          )
        }
      </div>
    )
  }
}

class ColorRow extends Component {
  decrement(num) {
    const newCount = this.props.count - num
    return () => {
      this.props.update(this.props.id, newCount)
    }
  }

  render() {
    const {color, count} = this.props
    return (
      <div className='color-row'>
        <span className='text'>{color}: {count}</span>
        {count >= 1 && <button onClick={this.decrement(1)}>Use 1 Paint</button>}
        {count >= 5 && <button onClick={this.decrement(5)}>Use 5 Paint</button>}
      </div>
    )
  }
}

export default App;
