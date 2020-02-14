import {User, MemberUser} from './user'

const TWO_DAYS_AGO = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 2))

describe('Member User', () => {
  let subject = {}
  beforeEach(() => {
    const user = new User({
      address1: '123 Foo',
      city: 'Footown',
      state: 'FO',
      zip: '14321',
      username: 'fooey-foo'
    })
    subject = new MemberUser(user)
  })

  it('provides a name', () => {
    expect(subject.name()).toBe('fooey-foo')
  })

  it('provides an address', () => {
    const expected = '123 Foo\nFootown, FO 14321'
    expect(subject.address()).toBe(expected)
  })

  it('provides an address with a second address line', () => {
    subject.data.address = 'Apt 2'
    const expected = '123 Foo\nApt 2\nFootown, FO 14321'
    expect(subject.address()).toBe(expected)
  })
})

describe('Admin User', () => {
  let subject = {}
  beforeEach(() => {
    const user = new User({
      username: 'fooey-foo'
    })
    subject = user
  })

  it('provides a name', () => {
    expect(subject.name()).toBe('fooey-foo')
  })

  it('provides an LDAP username ', () => {
    expect(subject.ldapUser()).toBe('fooey-foo/big_co')
  })
})

describe('Trial User', () => {
  let subject = {}
  beforeEach(() => {
    const user = new User({
      trialName: 'fooey-foo',
      trialStarted: TWO_DAYS_AGO
    })
    subject = user
  })

  it('provides a name', () => {
    expect(subject.name()).toBe('fooey-foo')
  })

  it('provides the days left in the trial', () => {
    expect(subject.daysLeftInTrial()).toBe(2)
  })
})