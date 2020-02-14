/*
* We want to modularize the code, separate it out determined by agents of change.
*
* As we talk about SRP, we need to define these modules based on the AGENTS OF CHANGE.
*
*
* Go through the functions, talk about what they do, but more importantly, talk about WHO might change them.
*   -Who are the agents of change that would want to affect the logic and the code that are IN these different functions and
*     --this will inform us of which MODULES these should be grouped into.
*
* If we identify the agents of change: each of these roles can be coming from a different angle and have different MOTIVATIONS and GOALS for what they want to do with the code.
* I we're able to modularize this code, then the pieces that remain together would be changed together. Then these agents of change won't be changing multiple files at once.
* */

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
 * QA/Customer Service (bugs) - you can imagine someone typing in Mr. without the period. Edge cases that we didn't really originally think about when we put this code together.
 *  --These are the kind of things that can pop up, rather than wanting to make changes to the business logic about how it is that we actually parse the first name out of a full name.
 * @param name
 * @returns {string}
 */
function parseFirstName(name) {
  var nameParts = name.split(' '),
    firstPart = nameParts[0]

  if (firstPart === 'Mr. ' || firstPart === 'Mrs.' || firstPart === 'Dr.') {
    return nameParts[1]
  } else {
    return firstPart
  }

}

/**
 * Copywriter/Copywriting.
 * @param firstName
 * @returns {string}
 */
function welcomeMessage(firstName) {
  return 'Welcome, ' + firstName + '!'
}

/**
 * Designer.
 * @param message
 */
function displayWelcome(message) {
  $('#welcome').text(message)
}