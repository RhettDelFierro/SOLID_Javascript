/*
* Refactoring Admin User functionality.
*
* Fascade pattern: an aesthetic front that is hiding some kind of complexity/abstraction/mess behind it.
* We give the appearance that there is an AdminUser they can use, when it reality it's just proxying to the mess behind it.
* The value is that we've created an interface, because User may be an enormous class with logic that is difficult to extract for
* getting something such as ldapUser().
* However, we did not slim User down at all.
*
* Again, the advantage here over extraction is that the class we're trying to extract from has too many intermingling dependencies to be able to safely pull things out and extract them.
* This is a very fast way of creating a fascade in front of a complex object, if the goal is to create a simple, clean api.
*
* If however, we want to dismantle the super object, then we should put in more work, more tests and use something like extraction.
*
* */

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

  daysLeftInTrial() {
    const started = this.data.trialStarted
    return this._millisToDays(new Date().getTime() - started.getTime())
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