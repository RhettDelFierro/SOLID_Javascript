export class PaintReport {
  constructor(data, options) {
    this.data = data
    this.reverseColumns = !!options.reverseColumns //incase options is not passed in/null, the default is false.
    this.prices = options.prices
    this.useDivs = !!options.useDivs
  }

  generate() {
    return this.wrapReport(
      this.getReportHeader() +
      this.wrapBody(
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
    const ths = columns.map(c => this.wrapColumn(c)).join('')
    return this.wrapHeader(ths)
  }

  // changing state multiple times in a function that looks like it should be a query function.
  getReportRow(color, remaining) {
    let values = [color, remaining]
    if (this.prices) values.push(this.prices[color])
    if (this.reverseColumns) values = values.reverse()
    const tds = values.map(v => this.wrapValue(v)).join('')
    return this.wrapRow(tds)
  }

  wrapReport(content) {
    if (this.useDivs) {
      return `<div class="table">${content}</div>`
    } else {
      return `<table>${content}</table>`
    }
  }

  wrapBody(content) {
    if (this.useDivs) {
      return content
    } else {
      return `<tbody>${content}</tbody>`
    }
  }

  wrapHeader(content) {
    if (this.useDivs) {
      return `<div>${content}</div>`
    } else {
      return `<thead><tr>${content}</tr></thead>`
    }
  }

  wrapRow(content) {
    if (this.useDivs) {
      return `<div>${content}</div>`
    } else {
      return `<tr>${content}</tr>`
    }
  }

  wrapValue(content) {
    if (this.useDivs) {
      return `<strong>${content}</strong>`
    } else {
      return `<th>${content}</th>`
    }
  }

  wrapColumn(content) {
    if (this.useDivs) {
      return `<strong>${content}</strong>`
    } else {
      return `<th>${content}</th>`
    }
  }
}
