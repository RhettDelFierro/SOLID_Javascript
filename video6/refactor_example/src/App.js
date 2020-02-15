import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// role will be to deal with the data.
// then we want to use this client inside the application (App) so that we can use that rather than having all the logic IN-LINE.
class PaintJsClient {
  fetchColorData = () => {
    return fetch('http://paintjs2000.com/colors', {
      mode: 'cors',
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  }

  updateColorCount = (id, count) => {
    return fetch(`http://paintjs2000.com/colors/${id}`, {
      method: 'POST',
      mode: 'cors',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count})
    })
  }
}

/*
* Now we have clearly de-lineated the high-level policy with the low-level implementaion details,
* it gives us some flexibility to now be able to create a NEW implementation that we can swap out pretty easily.
*
* We can create another class that behaves similarly to PaintJsClient but is actually hitting the new investor's server.
*
* It's worth noting that right now, we are still using PaintJsClient() inside the application (this.client = new PaintJsClient()).
* We will make a decision later on WHERE we want to initiate these things.
* */


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorData: []
    }
    this.client = new PaintJsClient()
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
