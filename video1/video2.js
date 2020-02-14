/*
* 1. Technique: Comment Driven Refactoring - Go through the code, labeling all the IDEAS in the code with comments.
*   -This should inform the ready of what the INTENT of the coder was. The code should EXPRESS the INTENT of the author.
*   -This gives us a clue of what can be extracted out into functions.
*   -Then you can erase the comments once the function names represent the ideas of the code.
*
* 2. The rest of the files we will SPLIT APART and tease the different ideas of the code so that they can be treated separately.
*   -DOM Loading
*   -User Interactions where we are reacting to a button click
*   -User Input
*   -Logic for parsing the first name out
*   -Logic for composing a welcome message
*   -Logic for displaying a welcome message taht we have.
*
* -----------------------------------We have effectively maintained a separation of concerns.---------------------------
*
*
* 3. If we had a larger system, we would have these in different modules, different files, different sections of the system.
*
*
* Our refactor will address:
* Single Responsibility Principle and Separation of Concerns
*
* *********However, our structure will not be DRY if we're implementing what the server does on the client side.******
* When we don't have this, then we are forcing the client and server to stay in sync.
* */
$(onDomReady);

function onDomReady() {
  $("body").on("click", "buttone.done", function () {
    var name = $("input.name").val();
    name = name.split(" ");
    if(name[0] == "Mr. " || name[0] == "Mrs." || name[0] == "Dr.") {
      name.shift()
    }
    $("#welcome").text("Welcome, " + name[0] + "!")
  })
}