import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PaintDataClient from './paint-data-client'

/**
 * In order to be declarative and nto implicit about which client we're going to test, is by saying what we mean.
 *
 * Here, we can pass in the client to the app as a prop.
 * This will allow us to instantiate an App with any client that we want and we are DECLARATIVELY pushing that logic up to the next level, up towards main.
 *
 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorData: []
    }

    this.client = props.client
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
