/**
 * One issue: if we go to PaintReport, we see that there's still a lot of rendering information going on.
 * There we need to have a lot of information about how the formatter works in order to make getReportHeader and getReportRow work.
 *
 * In generate, getReportHeader and getReportBody: this is all formatting information really: KNOWING how to call wrapReport, wrapBody, etc. should be a formatting logic piece.
 * We can extract this out and and that PaintReport's job is to make sure:
 *  --1. know what the columns are and get them right
 *  --2. know what the rows and row data are and get that right
 *  --3. but then everything else that's display oriented gets proxied over to the formatter.
 */

import {
  compose,
  objToTuple,
  removeZeros,
  sortAscending,
  take
} from './paint-data'
import {PaintReport} from './paint-report'

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