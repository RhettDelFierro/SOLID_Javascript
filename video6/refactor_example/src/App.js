import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


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

// we do know that we want the same functions as PaintJsClient which makes it able to seamlessly swap these with each other.
// we need to also do some transformation in the responses because the rest of the app is looking for a certain format.
class SuperInvestorClient {
  fetchColorData = () => {
    return fetch('http://bigbucksinvestor.com/hexes', {
      mode: 'cors',
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then(payload => {
      return {
        colors: payload.hexes.map(hex => {
          const hexValue = hex.hex
          return {
            id: this.hexToId(hexValue),
            color: this.hexToName(hexValue),
            count: hex.count
          }
        })
      }
    })
  }

  updateColorCount = (id, count) => {
    return fetch(`http://bigbucksinvestor.com/hexes/${id}`, {
      method: 'POST',
      mode: 'cors',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count})
    })
  }

  hexToId = (hex) => {
    const map = {
      'cc5c': 1,
      '768fb8': 2,
      '9eae65': 3,
      'ffd700': 4
    }

    return map[hex]
  }

  hexToName = (hex) => {
    const map = {
      'cc5c': 'Nice Red',
      '768fb8': 'Super Blue',
      '9eae65': 'Fantastic Green',
      'ffd700': 'Wonderful Yellow'
    }

    return map[hex]
  }
}

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
