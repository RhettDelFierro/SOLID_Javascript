import {TableFormatter} from './formatter'

export class PaintReport {
  constructor(data, options) {
    this.data = data
    this.reverseColumns = !!options.reverseColumns //incase options is not passed in/null, the default is false.
    this.prices = options.prices
    this.formatter = options.formatter || new TableFormatter()
  }

  generate() {
    const columns = this.columns()
    const rows = this.rows()
    return this.formatter.format(columns, rows)
  }

  columns() {
    let columns = ['Color', 'Remaining']
    if (this.prices) columns.push('Price')
    if (this.reverseColumns) columns = columns.reverse()
    return columns
  }

  rows() {
    let rows = []
    this.eachColor((color, remaining) => {
      rows.push(this.rowValues(color, remaining))
    })
    return rows
  }

  rowValues(color, remaining) {
    let values = [color, remaining]
    if (this.prices) values.push(this.prices[color])
    if (this.reverseColumns) values = values.reverse()
    return values
  }

  eachColor(fn) {
    const colors = Object.keys(this.data)
    colors.forEach(color => {
      const remaining = this.data[color]
      fn(color, remaining)
    })
  }

}
