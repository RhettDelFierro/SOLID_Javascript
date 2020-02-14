/**
 * Could be affected by Design if the HTML were to change, if we were to get a new class, or if they no longer want to use an input.
 * There is also the question of whether we always want to get the full name from the input. Maybe we get the full name from a database or some other kind of process.
 *  -This can be product/developer where we're making a substantial change to the way wer're interacting with data in the application.
 * Agents of change can be either/all: Designer/PM/Engineer
 * @returns {jQuery}
 */
export function getFullName() {
  return $('input.name').val();
}


/**
 * Designer.
 * @param message
 */
export function displayWelcome(message) {
  $('#welcome').text(message)
}