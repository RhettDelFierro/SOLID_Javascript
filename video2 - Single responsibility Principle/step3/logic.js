/**
 *
 * The copywriting portion and creating a welcome message function welcomeMessage () {..} we can imagine can be part of some part of some kind of messages module.
 * We're going to ignore the function onDoneButtonClicked() {...} function for now because while it is for the copywriter, it seems like a heavy function.
 */

import {parseFirstName} from './name-parser'
import {welcomeMessage} from './messages'

/**
 * Loading code: who would change the loading code? Developer concern. Don't know if anyone else would have any requirements per se for loading.
 * Additional logic beside setting up the click handlers perhaps.
 */
$(setupClickHandlers());

/**
 * View/Design logic: Affected by Designers who can change the visual look or change the html we are going to be using for the application.
 * Setting up the click handlers.
 * Possible changes:
 * We have selectors, so button.done (a button with a class of done) is a selector that can certainly change if the HTML, template or design might change.
 *
 */
function setupClickHandlers() {
  $('body').on('click', 'buttone.done', onDoneButtonClicked)
}

/**
 * Change behavior, what does done do? This can be a product/product manager/product owner kind of question.
 * There is a possibility that we want to use something other than the first name? Who would make that call? Maybe a copywriter or somebody on the business side will have an idea of the lexicon to use.
 * Change of Copy - Copywriting staff.
 *
 * So two agents of change here, Product/Copywriters
 */
function onDoneButtonClicked() {
  var name = getFullName()
  var firstName = parseFirstName(name)

  displayWelcome(welcomeMessage(firstName))
}

/**
 * Could be affected by Design if the HTML were to change, if we were to get a new class, or if they no longer want to use an input.
 * There is also the question of whether we always want to get the full name from the input. Maybe we get the full name from a database or some other kind of process.
 *  -This can be product/developer where we're making a substantial change to the way wer're interacting with data in the application.
 * Agents of change can be either/all: Designer/PM/Engineer
 * @returns {jQuery}
 */
function getFullName() {
  return $('input.name').val();
}


/**
 * Designer.
 * @param message
 */
function displayWelcome(message) {
  $('#welcome').text(message)
}