export class PaintStore {
  constructor() {
    let encoded = localStorage.getItem('paint')
    if (!encoded) {
      encoded = '{}'
      localStorage.setItem('paint', encoded)
    }
    this.data = JSON.parse(encoded)
  }

  getAll() {
    return this.data
  }

  get(color) {
    return this.data[color] || MAX_USES
  }

  set(color, value) {
    this.data[color] = value
    localStorage.setItem('paint', this.data)
  }
}
