import {Paint, PaintStore} from '../src'

describe('Paint', () => {
  describe('rendering a report', () => {
    it('returns an HTML table', () => {
      const paint = new Paint(new PaintStore())
      paint.usePaint('blue', 1)
      paint.usePaint(('red', 2))
      paint.usePaint('green', 3)
      const expected =
        '<table><thead>' +
        '<tr><th>Remaining</th><th>Color</th></tr></thead>' +
        '<tr><td>7</td><td>blue</td></tr>' +
        '<tr><td>6</td><td>red</td></tr>' +
        '<tr><td>5</td><td>green</td></tr>' +
        '</tbody></table>'
      expect(paint.generateReport()).toEqual(expected);
    })
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