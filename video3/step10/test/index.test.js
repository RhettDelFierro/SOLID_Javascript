import {Paint, PaintStore} from '../src'

describe('Paint', () => {
  let paint
  beforeEach(() => {
    paint = new Paint(new PaintStore())
    paint.usePaint('blue', 1)
    paint.usePaint(('red', 2))
    paint.usePaint('green', 3)
  })
  describe('rendering a report', () => {
    it('returns an HTML table', () => {
      const expected =
        '<table><thead>' +
        '<tr><th>Color</th><th>Remaining</th></tr></thead>' +
        '<tr><td>blue</td><td>7</td></tr>' +
        '<tr><td>red</td><td>6</td></tr>' +
        '<tr><td>green</td><td>5</td></tr>' +
        '</tbody></table>'
      expect(paint.generateReport()).toEqual(expected);
    })

    it('reverses the order of the columns', () => {
      const expected =
        '<table><thead>' +
        '<tr><th>Remaining</th><th>Color</th></tr></thead>' +
        '<tr><td>7</td><td>blue</td></tr>' +
        '<tr><td>6</td><td>red</td></tr>' +
        '<tr><td>5</td><td>green</td></tr>' +
        '</tbody></table>'
      expect(paint.generateReport({reverseColumns: true})).toEqual(expected);
    })

    it('includes price information', () => {
      const expected =
        '<table><thead>' +
        '<tr><th>{roce</th><th>Remaining</th><th>Color</th></tr></thead>' +
        '<tr><td>100</td><td>7</td><td>blue</td></tr>' +
        '<tr><td>200</td><td>6</td><td>red</td></tr>' +
        '<tr><td>300</td><td>5</td><td>green</td></tr>' +
        '</tbody></table>'
      const prices = {
        blue: 100,
        red: 200,
        green: 300
      }
      expect(paint.generateReport({reverseColumns: true, prices: prices})).toEqual(expected);
    })
  })
})

describe('Paint', () => {
  describe('rendering a report', () => {
  })
})


describe('providing data for "almost out" report', () => {
  it('returns 3 lowest non-zero painst ASC', () => {
    const paint = new Paint(new PaintStore())
    paint.usePaint('pink', 8)
    paint.usePaint('blue', 7)
    paint.usePaint('red', 6)
    paint.usePaint('green', 5)
    paint.usePaint('turquoise', 4)
    paint.usePaint('purple', 3)
    const expected = [
      ['blue', 1],
      ['red', 2],
      ['green', 3]
    ]
    expect(paint.almostOutData()).toequal(expected)
  })
})