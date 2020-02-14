import {Formatter} from './formatter'

export class PaintReport {
  constructor(data, options) {
    this.data = data
    this.reverseColumns = !!options.reverseColumns //incase options is not passed in/null, the default is false.
    this.prices = options.prices
    this.useDivs = !!options.useDivs
    this.formatter = new Formatter(!!options.useDivs)
  }

  generate() {
    return this.formatter.wrapReport(
      this.getReportHeader() +
      this.formatter.wrapBody(
        this.eachColor((color, remaining) => this.getReportRow(color, remaining)).join('')
      )
    )

  }

  eachColor(fn) {
    const colors = Object.keys(this.data)
    colors.forEach(color => {
      const remaining = this.data[color]
      fn(color, remaining)
    })
  }

  getReportHeader() {
    let columns = ['Color', 'Remaining']
    if (this.prices) columns.push('Price')
    if (this.reverseColumns) columns = columns.reverse()
    const ths = columns.map(c => this.formatter.wrapColumn(c)).join('')
    return this.formatter.wrapHeader(ths)
  }

  // changing state multiple times in a function that looks like it should be a query function.
  getReportRow(color, remaining) {
    let values = [color, remaining]
    if (this.prices) values.push(this.prices[color])
    if (this.reverseColumns) values = values.reverse()
    const tds = values.map(v => this.formatter.wrapValue(v)).join('')
    return this.formatter.wrapRow(tds)
  }

}
