import {parseFirstName} from './name-parser'
import {welcomeMessage} from './messages'
import {getFirstName} from './current-user'

/**
 * Designer.
 * @param message
 */
export function displayWelcome(message) {
  $('#welcome').text(message)
}

/**
 * View/Design logic: Affected by Designers who can change the visual look or change the html we are going to be using for the application.
 * Setting up the click handlers.
 * Possible changes:
 * We have selectors, so button.done (a button with a class of done) is a selector that can certainly change if the HTML, template or design might change.
 *
 */
export function setupClickHandlers() {
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
  displayWelcome(welcomeMessage())
}

export function getNameInputValue() {
  return $('input.name').val();
}
