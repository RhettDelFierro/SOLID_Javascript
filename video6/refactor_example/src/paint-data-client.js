export class PaintJsClient {
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

export class SuperInvestorClient {
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
    const hexValue = this.idToHex(id)
    return fetch(`http://bigbucksinvestor.com/hexes/${hexValue}`, {
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

  idToHex = (id) => {
    const map = {
      1: 'cc5c',
      2: '768fb8',
      3: '9eae65',
      4: 'ffd700'
    }

    return map[id]
  }
}