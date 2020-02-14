/**
 * Duck typing instead of class inheritance.
 * Duck Typing: in dynamic languages we don't have to base out functionality on strict types.
 *
 * When it comes to programming, rather than having to do typechecking, we can check if the object does certain things.
 *
 * We're going to move away from subclassing and move to a duck type approach.
 * 1. One way is by changing the structure that we have from a formatter based class and having the table and div formatter sub classes
 *    and change them all just to be modules (in other words plain old objects). Then the table and div formatter objects can be extended with whatever Formatter has on it..
 *
 * One of the convenient ways that these classes were written is that while the classes use 'this', we don't really have state in the formatters.
 *   --Everything is fairly functional so far and we won't have to unwind much state to get to duck typing.
 *
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