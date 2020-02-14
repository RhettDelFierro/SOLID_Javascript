/**
 * We have a problem with getFullName().
 * While we like the idea that having the responsibility of getting the full name being inside the current-user, there is a concern that a designer might want to change and it's inside a file that otherwise isn't something that a designer would care about.
 * We want to figure out how to put that kind of logic BACK into the view.
 *  --Then we logic of where we get full name DOES exist in current-user, but it's DELEGATING the specifics of that to the view file.
 *
 * Now we can isolate the $ selectors into the welcome-view file
 * Current-suer cares about usery-kind of things
 * Name Parser is it's own thing
 * Messages are it's own thing.
 */

import {
  setupClickHandlers
} from './welcome-view'

/**
 * Loading code: who would change the loading code? Developer concern. Don't know if anyone else would have any requirements per se for loading.
 * Additional logic beside setting up the click handlers perhaps.
 */
$(setupClickHandlers());



