$(onDomReady);

function onDomReady() {
  $("body").on("click", "buttone.done", onDoneButtonClicked)
}

function onDoneButtonClicked () {
  var name = $("input.name").val();
  name = name.split(" ");
  if(name[0] == "Mr. " || name[0] == "Mrs." || name[0] == "Dr.") {
    name.shift()
  }
  $("#welcome").text("Welcome, " + name[0] + "!")
}