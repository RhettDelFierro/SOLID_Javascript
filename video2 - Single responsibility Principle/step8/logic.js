/**
 * The last thing to take a look at is, if we're satisfied with onDoneButtonClicked() in welcome-view.
 *  displayWelcome() is something that belongs there.
 *  we're pulling welcomeMessage(...) from messages
 *  however, WHO is making the decision that getFirstName() (and the first name) should be apart of the welcome message?
 *    --This is a messaging responsibility and something that copywriter might want to have control over.
 *      --maybe they want to change the first name into using another type of name.
 *    --This should go into the same place where the logic for welcome-message is.
 *      --That way it will be part of the messaging logic, and not part of the view logic.
 *
 * Now welcome-view is exclusively for view level logic: $ selectors and command level logic for clicking 'done'.
 */

import {
  setupClickHandlers
} from './welcome-view'

/**
 * Loading code: who would change the loading code? Developer concern. Don't know if anyone else would have any requirements per se for loading.
 * Additional logic beside setting up the click handlers perhaps.
 */
$(setupClickHandlers());



