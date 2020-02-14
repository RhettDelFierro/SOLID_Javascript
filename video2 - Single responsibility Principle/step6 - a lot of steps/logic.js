/**
 * Back in the welcome-view:
 * 1. There is a problem, because we said the designers were going to be involved in a lot of that stuff, function onDoneButtonClicked() {...} does not seem like something that belongs in a welcome-view.
 *    --We can imagine this file would be CHANGED for a lot of different REASONS (Product Manager, Copywriter, etc.)
 *      --We will pull that function apart.
 *
 *  What we notice in that function:
 *  1. There is a DECISION being made in the function about the first name. (parseFirstName)
 *  2. There is another decision about how to get the full name. (getFullName)
 *
 * While getFullName, we're grabbing it out of the input, which seems like it would be something our welcome view should know about. However, is getting the full name something that makes sense for the VIEW?
 *    --It'd probably make more sense for the full name to be something that is pulled out into another entity.
 *      --Because this may be something that may want to be changed by a developer to pull from a database, or elsewhere.
 *
 * Then, because we now have logic for a current-user (current user) the logic for getting the first name can probably be there as well.
 *  --Then we won't have the view worrying about a full name vs a first name and we can just get a first name, period.
 *
 * After these steps, we are using the name-parser library in the current-user to get the full name we got and to use it to get the first name.
 */

import {
  setupClickHandlers
} from './welcome-view'

/**
 * Loading code: who would change the loading code? Developer concern. Don't know if anyone else would have any requirements per se for loading.
 * Additional logic beside setting up the click handlers perhaps.
 */
$(setupClickHandlers());



