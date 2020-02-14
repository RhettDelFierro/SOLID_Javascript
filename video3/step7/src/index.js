/**
 * Refactoring.
 *
 * Writing a compose function.
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
  constructor(data) {
    this.data = data
  }

  generate() {
    this.reportDone = false;
    this.inHeader = true;
    this.rowNum = 0
    this.report = '<table>'
    this.report += this.getReportHeader()
    this.eachColor((color, remaining) => {
      this.report += this.getReportRow(color, remaining)
    })
    this.report += '</tbody></table>'
    return this.report
  }

  eachColor(fn) {
    const colors = Object.keys(this.data)
    colors.forEach(color => {
      const remaining = this.data[color]
      fn(color, remaining)
    })
  }

  getReportHeader() {
    return '<thead><tr><th>Color</th><th>Remaining</th></tr></thead>'
  }

  // changing state multiple times in a function that looks like it should be a query function.
  getReportRow(color, remaining) {
    return `<tr><td>${color}</td><td>${remaining}</td></tr>`
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
  generateReport() {
    return new PaintReport(this.store.getAll()).generate()
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