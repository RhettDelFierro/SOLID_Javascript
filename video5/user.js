export class User {
  constructor(data) {
    this.data = data
  }

  address() {
    const data = this.data
    if (data.address) {
      return this._formatAddress(data.address, data.address2, data.city, data.state, data.zip)
    }
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

  _formatAddress(add1, add2, city, state, zip) {
    let out = add1
    if (add2) out += `\n${add2}`
    out += `\n${city}, ${state}, ${zip}`
    return out
  }
}