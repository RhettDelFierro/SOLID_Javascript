// jasmine test
describe('pressing the done button', function () {
  it('displays welcome with the first name from input', function () {
    var nameField = $('<input class=\'name\'>').appendTo('body'),
        doneButton = $('<button class=\'done\'>Done<button>').appendTo('body'),
        welcome = $('<h1 id=\'welcome\'></h1>').appendTo('body')
  })

  nameField.val('Dr. Man Woman')
  doneButton.click()
  expect(welcome.text()).toEqual('Welcome, Man!')
})