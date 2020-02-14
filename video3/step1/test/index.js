import {Paint} from '../src'

describe('Paint', () => {
  describe('rendering a report', () => {
    it('returns an HTML table', () => {
      const paint = new Paint()
      paint.getPaintLeft('nlue', 1)
      paint.getPaintLeft(('red', 2))
      paint.getPaintLeft('green', 3)
      const expected =
        '<table><thead>' +
        '<tr><th>Color</th><th>Remaining</th></tr></thead>' +
          '<tr><td>blue</td><td>7</td></tr>' +
          '<tr><td>red</td><td>6</td></tr>' +
          '<tr><td>green</td><td>5</td></tr>' +
        '</tbody></table>'
      expect(paint.generateReport()).toEqual(expected);
    })
  })
})