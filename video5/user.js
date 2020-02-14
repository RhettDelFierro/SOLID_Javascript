/*
* A problem with both MemberUser and AdminUser is that what if MemberUser still needs to access many of those original methods that live in User?
* What if those methods are shared by other classes where we're proxying back logic like this.user.name() from User?
*
* If things are added over time, there's a maintenance cost to going back and adding those functions to other places.
*
* Classical Inheritance (for TrialUser).
*
* Advantage: we can granularly move through and pull out what we want from the original user class without breaking anything.
* This is because we have access to that from the parent object.
* This means that is something like millisToDays is being used by many different subclasses or just inside the User class itself,
* it wouldn't matter.
*
* Downsides: The api is clear, but can not see the methods it has in other places like REPL's because it's not on the class explicitly.
*
* What we haven't achieved, is we never determined a strong line for where millisToDays should go.
* Overtime, we may create more and more coupling between the subclasses and the base class that would get more difficult to understand and pull apart than the original situation.
*
* The first two approaches were composition, this approach is inheritance.
*
* extraction: decoupled approach
* fascade: define the api clearly but hasn't unrraveled anything
* inheritance: build subclasses to create individual interfaces for our clients, which may create more problems than solutions down the road.
**/

export class AdminUser {
  contructor(user) {
    this.user = user
  }

  name() {
    return this.user.name()
  }

  ldapUser() {
    return this.user.ldapUser()
  }
}


export class MemberUser {
  constructor(user) {
    this.user = user
  }

  address() {
    const data = this.user.data
    if (data.address1) {
      // this is dangerous because: given the convention, we know this is internal because of the _
      // meaning, it shouldn't be called outside of the class that's it's in.
      return this._formatAddress(data.address1, data.address2, data.city, data.state, data.zip)
    }
  }

  _formatAddress(add1, add2, city, state, zip) {
    let out = add1
    if (add2) out += `\n${add2}`
    out += `\n${city}, ${state} ${zip}`
    return out
  }

  name() {
    return this.user.name()
  }
}

// As of right now, there seem sto be a lot of concerns in the User class: the fact that we're doing various formatting and storing the data itself.
// This means there's an opportunity to take formatAddress and pull it.
export class User {
  constructor(data) {
    this.data = data
  }

  name() {
    return this.data.username || this.data.trialName
  }

  ldapUser() {
    return `${this.user.data.username}/big_co`
  }

  _millisToDays(millis) {
    return Math.floor(millis / 1000 / 60 / 24)
  }
}

export class TrialUser extends User {
  daysLeftInTrial() {
    const started = this.data.trialStarted
    return this._millisToDays(new Date().getTime() - started.getTime())
  }
}
