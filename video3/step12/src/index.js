/**
 * The problem here is that we have to go into where we're generating html and swap those out with divs.
 * The big problem is that multiple functions write the html.
 * We need to find a way to make this all swappable.
 *
 * Create a wrap functions.
 * Where we used to have hard-coded values, we now have wrap functions.
 * We've now managed to pull out all the kind of specifics about the kind of html we're using => table/div
 *  --We've placed these into their own methods.
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