import {
  objToTuple,
  removeZeros,
  sortAscending,
  take
} from '../../step17/src/paint-data'

describe('converting object to tuples', () => {
  it('creates an array of [key,value] tuples', () => {
    const orig = {foo: 'bar', baz: 'bat'}
    const expected = [
      ['foo', 'bar'],
      ['baz', 'bat']
    ]
    expect(objToTuple(orig)).toEqual(expected)
  })
})

describe('throwing out zeroes', () => {
  it('removes tuples with a 0 value', () => {
    const orig = [
      ['blue', 1],
      ['red', 0],
      ['green', 2]
    ]
    const expected = [
      ['blue', 1],
      ['green', 2]
    ]
    expect(removeZeros(orig)).toEqual(expected)
  })
})

describe('sort ascending', () => {
  it('returns an array sorted by index 1', () => {
    const orig = [
      ['blue', 1],
      ['red', 0],
      ['green', 2]
    ]
    const expected = [
      ['red', 0],
      ['blue', 1],
      ['green', 2]
    ]
    expect(sortAscending(orig)).toEqual(expected)
  })
})

describe('taking the first n', () => {
  it('returns an array of n length', () => {
    const orig = [
      ['blue', 1],
      ['red', 0],
      ['green', 2]
    ]
    const expected = [
      ['blue', 1],
      ['red', 0],
    ]
    expect(take(2, orig)).toEqual(expected)
  })
})