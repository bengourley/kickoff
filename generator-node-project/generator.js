module.exports = Generator

var generate = require('../generate')
  , inquirer = require('inquirer')

function required(value) {
  return !!value
}

function intCheck(n) {
  return '' + parseInt(n) === n
}

function Generator() {}

Generator.prototype.prompts =
  [ { name: 'projectName', message: 'Name this project', validate: required }
  , { name: 'projectDescription', message: 'Describe this project', validate: required }
  , { name: 'organization', message: 'What is the name of the organization', validate: required }
  , { name: 'port', message: 'Select a port', validate: intCheck }
  ]

Generator.prototype.generate = function (path, cb) {
  inquirer.prompt(this.prompts, function (answers) {
    this._generate(path, answers, cb)
  }.bind(this))
}

Generator.prototype._generate = function (path, settings, cb) {
  generate(__dirname, path, settings, cb)
}

if (!module.parent) {
  var g = new Generator()
  g.generate(__dirname + '/new-project', function (err) {
    if (err) return console.log(err.message, err)
    console.log('done!')
  })
}
