/**
 * QA/Customer Service (bugs) - you can imagine someone typing in Mr. without the period. Edge cases that we didn't really originally think about when we put this code together.
 *  --These are the kind of things that can pop up, rather than wanting to make changes to the business logic about how it is that we actually parse the first name out of a full name.
 * @param name
 * @returns {string}
 */
export function parseFirstName(name) {
  var nameParts = name.split(' '),
    firstPart = nameParts[0]

  if (firstPart === 'Mr. ' || firstPart === 'Mrs.' || firstPart === 'Dr.') {
    return nameParts[1]
  } else {
    return firstPart
  }

}