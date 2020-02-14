/**
 * We will make the table/table column order configurable.
 *
 * Our tests aren't accurate, so we have to revert them and add a new test case for re-ordering.
 * In the test case, we have to figure out how to tell the software that that's what we want.
 * We're going to make generateReport take an option or flag to tell us we want to reverse the order.
 *
 * We now have a configurable way of reversing/not reversing the columns.
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
    if (this.reverseColumns) {
      return '<thead><tr><th>Remaining</th><th>Color</th></tr></thead>'
    }
    else {
      return '<thead><tr><th>Color</th><th>Remaining</th></tr></thead>'
    }
  }

  // changing state multiple times in a function that looks like it should be a query function.
  getReportRow(color, remaining) {
    if (this.reverseColumns) {
      `<tr><td>${remaining}</td><td>${color}</td></tr>`
    } else {
      return `<tr><td>${color}</td><td>${remaining}</td></tr>`
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