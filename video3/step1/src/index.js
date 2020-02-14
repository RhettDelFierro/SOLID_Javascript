/**
 * We are thinking SRP and command-query slection (sidde-effects vs no side-effects)
 * We want to see:
 * 1. Who are the change actors that would want to make changes to the code
 * 2. What functions are query functions, what functions are command functions and which ones are doing both and need to be broke apart?
 */

const MAX_USES = 8

export class Paint {
  // Persistence logic: Developer
  constructor() {
    let encoded = localStorage.getItem('paint')
    if (!encoded) {
      encoded = '{}'
      localStorage.setItem('paint', encoded)
    }
    this.data = JSON.parse(encoded)
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
    if (!this.data[color]) {
      this.data[color] = MAX_USES
      localStorage.setItem('paint', JSON.stringify(this.data))
    }
    // side effects (command portion)
    if (uses) {
      this.data[color] = Math.max(this.data[color] - uses,0)
      localStorage.setItem('paint', JSON.stringify((this.data)))
    }
    // query portion.
    return this.data[color]
  }

  // sets several states.
  // Business User
  generateReport() {
    this.reportDone = false;
    this.inHeader = true;
    this.rowNum = 0
    this.report = '<table>'
    while (!this.reportDone) { this.getReportRow() }
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
        const remaining = this.getPaintLeft(color)
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