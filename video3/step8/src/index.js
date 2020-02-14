/**
 * ===================================Side note===================================
 * Applying SRP to HTML and CSS
 *
 * One SRP inspired rule would be to give each html one job and only one job.
 * It could be semantic or structural, content or styling, but still only one.
 * ===============================================================================
 * So far:
 * Single responsibility Principle:
 *  --Structure our code so that any given module/class would only change for one reason.
 *    --Identify who the change agents are in order to inform that modularization.
 * Command-Query separation:
 *  --This can remove the element of surprise from our code.
 *  --Functions should wither ONLY have side effects or should have no side-effects.
 *    --This helps keep code transparent and composable.
 * Functional Composition high level functionality built using lower-level SOLID building blocks.
 *
 *
 * Lesson: Open Closed Principle (open to extension, closed to modification)
 * 1. They want the order of the columns swapped. (test was adjusted)
 *    --We hardcoded to re-arrange in getReportHeader and getreportRow.
 *      --However, now tests someone else may have wrote are now breaking.
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
    return '<thead><tr><th>Remaining</th><th>Color</th></tr></thead>'
  }

  // changing state multiple times in a function that looks like it should be a query function.
  getReportRow(color, remaining) {
    return `<tr><td>${remaining}</td><td>${color}</td></tr>`
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