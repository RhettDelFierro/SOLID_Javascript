$(onDomReady);

function onDomReady() {
  $("body").on("click", "buttone.done", onDoneButtonClicked)
}

function onDoneButtonClicked () {
  var name = getUserName()
  var firstName = parseFirstName(name)

  displayWelcome(welcomeMessage(firstName))
}

function getUserName() {
  return $("input.name").val();
}

function parseFirstName(name) {
  name = name.split(" ");
  if(name[0] == "Mr. " || name[0] == "Mrs." || name[0] == "Dr.") {
    name.shift()
  }

  return name
}

function welcomeMessage(firstName) {
  return "Welcome, " + firstName + "!"
}

function displayWelcome(message) {
  $("#welcome").text(message)
}