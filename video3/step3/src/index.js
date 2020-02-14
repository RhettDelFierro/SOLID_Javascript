/**
 * We're going to create another class: some kind of a report class and change up some of the logic in the methods to point to the right data.
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
    while (!this.reportDone) {
      this.getReportRow()
    }
    this.report += '</tbody></table>'
    return this.report
  }

  // changing state multiple times in a function that looks like it should be a query function.
  getReportRow() {
    let output
    if (this.inHeader) {
      output = '<thead><tr><th>Color</th><th>Remaining</th></tr></thead>'
      // manipulating state (Command)
      this.inHeader = false
    } else {
      const color = Object.keys(this.data)[this.rowNum++]
      if (color) {
        const remaining = this.data[color]
        output = `<tr><td>${color}</td><td>${remaining}</td></tr>`
      } else {
        // manipulating state (Command)
        this.reportDone = true
        return
      }
    }
    // manipulating state (Command)
    this.report += output
    // query
    return output
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
    localStorage.setItem("paint", this.data)
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
    // side effects (command portion)
    if (uses) {
      const newUses = this.data[color] = Math.max(this.store.get(color) - uses, 0)
      this.store.set(color, newUses)
    }
    // query portion.
    return this.store.get(color)
  }

  // sets several states.
  // Business User
  generateReport() {
    return new PaintReport(this.store.getAll()).generate()
  }
}