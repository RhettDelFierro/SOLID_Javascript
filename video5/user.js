/*
* Start our refactoring by pulling the Member User functionality out of the User class.
* 1. We will use "extraction" for this.
* Our goal is slimming down the User class by literally pulling funcitonality out of it and into a different class.
* It will act like an interface in that all of the Member-specific functionality will live in a MemberUser class.
*
* That way, I'll know if I need a member, we're going to use the MemberUser class.
*
* ------------->Any SHARED functionality will need to be there as well.<---------------
*
* Remember, this sits between the calling code and the big user class.
* MemberUser kind of wraps itself around the user class and functioning kind of like an interface.
*
* Because address() is something ONLY member users have, we can extract that out of address and into MemberUser
*
* A better solution rather than making _formatAddress public on the User class, we can instead he can put it into
* some kind of formatting helper module or an address module/class that knows how to format itself.
*
* We're going to address name() - something used across many different users.
* We weren't able to extract name() from user entirely.
* */

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

  ldapUser() {
    return `${this.data.username}/big_co`
  }

  name() {
    return this.data.username || this.data.trialName
  }

  _millisToDays(millis) {
    return Math.floor(millis / 1000 / 60 / 24)
  }
}