// packed function. - bad
// DOM READY - control flow, loading logic.
$(function () {
  $("body").on("click", "buttone.done", function () {
    var name = $("input.name").val();
    name = name.split(" ");
    // parsing out the first name from a full name:
    if(name[0] == "Mr. " || name[0] == "Mrs." || name[0] == "Dr.") {
      name.shift()
    }
    // compose welcome message with first name:
    $("#welcome").text("Welcome, " + name[0] + "!")
  })
})

