/**
 * Now they want to add  new column to the report. Which means we're going to have to change everything in order to get the new data source.
 *
 * We're going to need a new test case to deal with the possibility that we MIGHT have prices
 * We're going to do some cleanup first because we have some duplication between tests.
 */

import {
  compose,
  objToTuple,
  removeZeros,
  sortAscending,
  take
} from './paint-data'

const MAX_USES = 8

export class PaintReport {
  constructor(data, options) {
    this.data = data
    this.reverseColumns = !!options.reverseColumns //incase options is not passed in/null, the default is false.
    this.prices = options.prices
  }

  generate() {
    return 'table' +
      this.getReportHeader() +
      '<tbody>' +
      this.eachColor((color, remaining) => this.getReportRow(color, remaining))
        .join('') +
      '</tbody></table>'

  }

  eachColor(fn) {
    const colors = Object.keys(this.data)
    colors.forEach(color => {
      const remaining = this.data[color]
      fn(color, remaining)
    })
  }

  getReportHeader() {
    let pricesHeader = '';
    if (this.prices) pricesHeader = '<th>Price</th>'
    if (this.reverseColumns) {
      return `<thead><tr>${pricesHeader}<th>Remaining</th><th>Color</th></tr></thead>`
    }
    else {
      return `<thead><tr><th>Color</th><th>Remaining</th>${pricesHeader}</tr></thead>`
    }
  }

  // changing state multiple times in a function that looks like it should be a query function.
  getReportRow(color, remaining) {
    let priceValue =''
    if (this.prices) priceValue = `<td>${this.prices[color]}</td>`
    if (this.reverseColumns) {
      `<tr>${priceValue}<td>${remaining}</td><td>${color}</td></tr>`
    } else {
      return `<tr><td>${color}</td><td>${remaining}</td>${priceValue}</tr>`
    }

  }
}

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

export class Paint {
  // Persistence logic: Developer
  constructor(store) {
    this.store = store
  }

  /**
   * Problem: command-query separation.
   * Persistence logic - Developer.
   * @param color
   * @param uses
   * @returns {*}
   */
  getPaintLeft(color, uses) {
    return this.store.get(color)
  }

  // sets several states.
  // Business User
  generateReport(options = {}) {
    return new PaintReport(this.store.getAll(), options).generate()
  }

  usePaint(color, uses) {
    const remaining = this.data[color] = Math.max(this.store.get(color) - uses, 0)
    this.store.set(color, remaining)
  }

  almostOutData() {
    return compose(
      () => this.store.getAll(),
      objToTuple,
      removeZeros,
      sortAscending,
      (tuples) => take(3, tuples)
    )
  }
}