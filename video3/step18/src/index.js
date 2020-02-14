/**
 * Remember, when we add abstractions in order to satisfy Open Closed Principle, one of the risks we run is adding abstractions that are not quite right.
 * Maybe they leak, or they're not quite meaningful or correct.
 *
 * Here, the formatter methods don't always make a lot of sense outside of the TabelFormatter because row, header, etc. are table-specific ideas.
 * Overall, we're doing the same thing for both, yet it's like having two different implementations for the same functions in order for the formatter to work.
 *
 * If you went to do the same for a csv, you run into the same issues: there's no sense of wrapBody for a csv because a csv doesn't have a body.
 *
 * Meaning, we have a leaky abstraction: it doesn't make sense for things that aren't tables.
 *
 * There is really only one method that actually matters: format(columns, rows) - tis' where the magic happens. it takes the columns and rows and then spits out the rendered content.
 * All the rest are kind of helpers and ways of trying to make this work across a series of different formatters, but it feels like we're overcomplicating things.
 * All we really want to do is essentially take some kind of template and render some data into it and spit it out.
 *
 * That template would be something unique to each of these formatters, but the data is something that is comment to them.
 *
 * What we're going to do is: define format(..) directly inside of our table formatter, div formatter, csv formatter, etc.
 * Eather than trying to make it work for everything at the same time (format(..) defined once in the Formatter object).
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