import {Paint, PaintStore} from '../src'

describe('Paint', () => {
  let paint
  let prices
  beforeEach(() => {
    paint = new Paint(new PaintStore())
    paint.usePaint('blue', 1)
    paint.usePaint(('red', 2))
    paint.usePaint('green', 3)
    prices = {
      blue: 100,
      red: 200,
      green: 300
    }
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
          '<tr><th>Price</th><th>Remaining</th><th>Color</th></tr></thead>' +
          '<tr><td>100</td><td>7</td><td>blue</td></tr>' +
          '<tr><td>200</td><td>6</td><td>red</td></tr>' +
          '<tr><td>300</td><td>5</td><td>green</td></tr>' +
        '</tbody></table>'
      expect(paint.generateReport({reverseColumns: true, prices: prices})).toEqual(expected);
    })

    it('uses divs', () => {
      const expected =
        '<div class="table">' +
          '<div><strong>Price</strong><strong>Remaining</strong><strong>Color</strong></div>' +
          '<div><span>100</span><span>7</span><span>blue</span></div>' +
          '<div><span>200</span><span>6</span><span>red</span></div>' +
          '<div><span>300</span><span>5</span><span>green</span></div>' +
        '</div>'
      expect(paint.generateReport({reverseColumns: true, prices: prices, useDivs: true})).toEqual(expected);
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