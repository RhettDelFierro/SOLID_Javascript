$(onDomReady);

function onDomReady() {
  $("body").on("click", "buttone.done", onDoneButtonClicked)
}

function onDoneButtonClicked () {
  var name = getUserName()
  var firstName = parseFirstName(name)

  $("#welcome").text("Welcome, " + firstName + "!")
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