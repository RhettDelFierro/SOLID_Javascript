/**
 * We're going to fix getPaintLeft:
 * It has both a side effect and a query - we want to extract those apart.
 * If you check the implementation in the test, getPaintLeft is never returning anything.
 * rather than thinking about it as GETTING paint left, it's more about USING the paint.
 *
 * Now we've managed to:
 * 1. Detangle the code using SRP in order to take the concerns
 * 2. Separate them so that different agents of change would affect different parts of the codebase.
 * 3. Used command query separation in order to make sure that it's very clear what each of these are doing
 *    and that there's no unintended side-effects.
 */

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
}