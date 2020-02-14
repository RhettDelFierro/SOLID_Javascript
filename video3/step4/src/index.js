/**
 * We had SRP covered, no we're going to address command-query separation.
 * We're going to turn getReportRow() into a query function and not have it change state.
 *
 * First, take a look at what the state IS that's being changed:
 * 1. The idea of a report being done.
 * 2. Of being in the header.
 * For both of these: given the fact that we now have a PaintReport that's being fired up and thrown away when it's needed, keeping track of this intermittent state is probably not necessary.
 * The only reason why we're keeping track of a report being done (this.reportDone) is so we can do the while loop until we're done.
 * A better iteration would be wanting to iterate over each of the colors, creating one row per color and once we're out of colors we're going to be done and move on.
 *  --This is where the eachColor function will be introduced.
 *
 *
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