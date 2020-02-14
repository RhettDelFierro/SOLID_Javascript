/**
 * Not really any code changes here outside of moving the class into it's own file. The lessons from the comments will be applied in the next step.
 *
 * Problem from code review: we've jammed every use case into one class.
 *
 * This is where the Open Closed Principle comes into consideration.
 * Open to extension, closed to modification:
 * 1. Extension refers to adding new classes, modules, functions or methods to the system.
 *    --The existing code doesn't change, we just add new ideas.
 *    --If we look at the git diff, it should all be green.
 * 2. Modification refers to making inline changes to existing logic.
 *    --Might be new code branches or changes to the logic, but it's going to add new ideas as well as changing or destroying existing ones.
 *
 * SRP: Asks us to think about who mgiht want to make changes to a particular part of code.
 * Open Closed Principle: think about what parts of the code are most likely to change and then how can we make those more changeable.
 *   --We may have many code branches and if/else statements in a simple greeting message: const welcome = user => `Welcome Mr. ${user.lastName}`
 *     --If occupation is a Doctor, use Dr., if woman and married use Mrs. if not marries used Ms., etc.
 *     --By modifying the original function which was maybe just 'Welcome, Mr. __', we've broke Open Closed Principle by modifying the function by creating other branches in it for the other prefixes.
 *   --In this case, it's not immediately obvious how we can use EXTENSION to solve this problem by just adding new functions.
 *     --WHAT WE ARE MISSING IS AN ABSTRACTION:
 *       --In the welcome message example, what we are missing is the ability for the user to have that responsibility of deciding what their title is.
 *         --By moving all of this logic into some kind of title function on the user object, we're able to greatly clarify this code because now it's focused on the once thing that it CARES about: the logic for composing a greeting message.
 *           --const welcome = (user) => `Welcome ${user.title()} ${user.lastName}
 *           --There are many different ways this title function may be created:
 *             --It's possible to have one function that has that wholemess of logic inside of it.
 *               --But perhaps there might be a different subclass for user for each different type and inside each subclass they can define that function in a different way.
 *
 *   --The Open Closed Principle encourages us to use a lof of abstractions, indirection and interfaces in our code.
 *     --Possible costs of this:
 *       1. It's possible to end up with some abstractions that are not meaningful and can cause more problems than solutions.
 *       2. For Open Closed Principle to work, you have to know ahead of time what things are going to change which is very difficult.
 *       3. Not a silver bullet, requires discernment and some clear thought and communication with a team to decide how you're going to use it.
 *   --When Open Closed succeeds: prevents improper cohesion, reducing the rate of  churn in code and ultimately creating a more sustainable and maintainable system.
 *
 *   ANYTIME you feel the need to go in and modify EXISTING logic in a class or module, stop and step back and ask if there's some missing abstraction that allow you to instead make the change through EXTENSION.
 *
 *   **If there is incorrect implementation code, then you're going to want to go ahead and MODIFY it, we don't want incorrect code to remain. However, assuming that the changes you're making are due to a natural progression of the codebase, then EXTENSIONS will always be cleaner that modification.**
 *   **In cases where you're going back over existing code to refactor it, keep an eye out for those logic "junk drawers" where rules have just accumulated one by one over the lie of the project. Then decide what's the missing abstraction and what parts of the code are perhaps best left alone for now.**
 *     --When you find something that doesn't fit, pull it out, fine the right place for it and clarify the codebase for your teammates.
 *
 *
 * We will identify logic junk drawers for this codebase:
 * 1. Here it is mainly the "wrap__" div/html functions - they have conditional logic in order to switch between the table and div based layouts.
 *    --Imagine, what would happen if we need a third format? Such as a CSV or some other kind of report formatting? It'd just be more flags and we'd end up with more conditionals.
 *      --This would add a large amount of complexity to PaintReport and what it's doing is all MODIFICATION rather than extension:
 *        --We're modifying each function and adding more cases to it everytime we want to add a new method for formatting or report.
 *          --We're going to go ahead and add to this new monster class rather than being able to put this logic in it's own classes and modules.
 *
 *
 * ****************Anytime that we feel like we might be breaking the Open Closed Principle, we want to look for the missing ABSTRACTION.*******************
 * 2. In this case, the missing abstraction is that the class is really doing two things: (which may also be an SRP violation).
 *   --1. Data logic: getReportRowand getReportHeader are essentially using some logic to figure out what are the columns and what order those columns are in and how should those columns be displayed. For all the rows, what order should the row data be in and how should that be formatted?
 *   --2. Formatting logic (which is what we keep adding more to such as csv's): A lot of formatter methods, which none of them necessarily know about rows or contents per se, other than the function names. but it does know that we're taking content and wrap/format them in a certain way.
 *
 *   If we are able to separate out the Data from the Formatting and create a new abstraction for a formatter (because that's what is ballooning)
 *   and allow there to be MULTIPLE formatters (one for tables, another for divs, another for csv's, etc.),
 *   then this is going to give us the ability to build out many of these classes when we need to create a new one and we'll just
 *   be able to pop it into PaintReport without any downstream changes.
 */

import {
  compose,
  objToTuple,
  removeZeros,
  sortAscending,
  take
} from './paint-data'
import {PaintReport} from './paint-report'

const MAX_USES = 8



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