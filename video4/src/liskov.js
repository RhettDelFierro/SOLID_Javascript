class Wall {
  attachAndHold(handhold, x, y) {
    const hole1 = drillHole(x, y)
    const hole2 = drillHole(x + 3, y)
    attachWithScrews(handhold, hole1, hole2)
  }
}

class HandHold {
  constructor() {
    this.color = 'red'
  }
}

/*
* Imagine we're modeling a wall and handholds as classes.
*
* The wall class has an attachHandold method. It will drill holes, add screws and attaches the handhold.
* The wall class does not care what color the handhold is or what shape it is.
* Right now, it (the wall) only cares about how the handhold is ATTACHED.
* The wall class has a CONTRACT, that says that a handhold needs to have two screw holes that are 3 inches apart and it can be attached with two screws.
* The handhold class is supposed to hold up to it's side of the CONTRACT and the piece is now integrated fully.
*
* You can then imagine we might subclass the handhold class in order to make new handholds. Different shapes and colors.
* The liskov substitution principle asserts that these would have to hold up the same CONTRACTS that the BASE class had with it's users.
* Even though they may be different colors and shapes, they must still have two screw holes 3 inches apart.
* This is so it can be attached to the wall without making ANY CHANGES to how the wall WORKS.
*
* If green handholds need glue, or blue handholds need tape, then this is a violation of the substitution principle.
* Every new subclass would then be BREAKING the CONTRACT that the original handhold had with the wall.
* The wall would need all kinds of new processes to attach handholds that it didn't need before.
*
*
* We can see now that the attachAndHold method is bloating very quickly. This points to an Open Closed Violation.
* However, note all the type checking.
* Type checking is a GIVEAWAY that what we are really seeing is a Liskov Substitution violation.
*
* If one handhold requires tape, while another requires glue, then they probably shouldn't inherit from a base class that uses screws.
* PERIODT.
*
* Once the faulty inheritance is broken, you're able to reassess.
* Perhaps you want the wall to have different functionality for attaching a handhold with glue vs tape vs screws.
* You might even decide that that's a useful classification in your system for NEW BASE CLASSES.
* Then you can subclass THOSE NEW BASE CLASSES while fully meeting the Liskov Substitution Principle.
* The again, you may decide that really all of these things SHOULD use two screws
*   --and if they're supposed to be glued then maybe you glue them onto two screws and
*     then they can be TRANSPARENTLY installed onto the wall. This would meet the Liskov Substitution Principle.
* */


class NewWall {
  attachAndHold(handhold, x, y) {
    if (handhold instanceof GreenHandHold) {
      const hole = drillHole(x, y)
      attachWithScrews(handhold, hole1)
    } else if (handhold instanceof BlueHandHold) {
      attachWithGlue(handhold, x, y)
    } else if (handhold instanceof YellowHandHold) {
      attachWithTape(handhold, x, y)
    } else {
      const hole1 = drillHole(x, y)
      const hole2 = drillHole(x + 3, y)
      attachWithScrews(handhold, drillHold(x,y ), drillHold(x+3, y))
    }

  }
}

class NewHandHold {
  constructor() {
    this.color = 'red'
  }
}

class GreenHandHold extends NewHandHold {
  constructor() {
    this.color = 'green'
  }
}

class YellowHandHold extends NewHandHold {
  constructor() {
    this.color = 'yellow'
  }
}

class BlueHandHold extends NewHandHold {
  constructor() {
    this.color = 'blue'
  }
}