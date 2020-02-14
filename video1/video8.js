$(onDomReady);

function onDomReady() {
  $('body').on('click', 'buttone.done', onDoneButtonClicked)
}

function onDoneButtonClicked() {
  var name = getUserName()
  var firstName = parseFirstName(name)

  displayWelcome(welcomeMessage(firstName))
}

function getUserName() {
  return $('input.name').val();
}

// here we have cleaned up the parseFirstName function.
// we were overwriting the name variable being passed in which is not good.
function parseFirstName(name) {
  var nameParts = name.split(' '),
    firstPart = nameParts[0]

  if (firstPart === 'Mr. ' || firstPart === 'Mrs.' || firstPart === 'Dr.') {
    return nameParts[1]
  } else {
    return firstPart
  }

}

function welcomeMessage(firstName) {
  return 'Welcome, ' + firstName + '!'
}

function displayWelcome(message) {
  $('#welcome').text(message)
}