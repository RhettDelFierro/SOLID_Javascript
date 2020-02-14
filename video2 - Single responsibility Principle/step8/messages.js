import {getFirstName} from './current-user'

/**
 * Copywriter/Copywriting.
 * @param firstName
 * @returns {string}
 */
export function welcomeMessage() {
  const name = getFirstName()
  return 'Welcome, ' + name + '!'
}
