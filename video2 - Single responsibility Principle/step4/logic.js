/**
 *
 * For the Designer, we see a few things:
 *  1. We know the designer would be interested in the 'button.done' possibly wanting to change it.
 *  2. We will start with the easiest stuff that the designer will be concerned about.
 */

import {parseFirstName} from './name-parser'
import {welcomeMessage} from './messages'
import {
  displayWelcome,
  getFullName
} from './welcome-view'

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

