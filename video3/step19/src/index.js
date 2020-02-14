/**
 * One last thing: table formatter and div formatter than only have one function - format.
 *
 * An object with only a single function inside of it is really just a function in disguise.
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
    const remaining = Math.max(this.store.get(color) - uses, 0)
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