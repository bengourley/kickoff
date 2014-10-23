module.exports = CmsGenerator

var Generator = require('../generator-node-project/generator')
  , generate = require('../generate')

function CmsGenerator() {
  Generator.apply(this)
}

CmsGenerator.prototype = Object.create(Generator.prototype)

CmsGenerator.prototype.prompts = CmsGenerator.prototype.prompts.concat(
  [ { name: 'adminPort', message: 'Select a port for the admin', validate: intCheck }
  ])

CmsGenerator.prototype._generate = function (path, settings, cb) {
  Generator.prototype._generate.call(this, path, settings, function () {
    generate(__dirname, path, settings, cb)
  })
}

function intCheck(n) {
  return '' + parseInt(n) === n
}

if (!module.parent) {
  var g = new CmsGenerator()
  g.generate(__dirname + '/new-project', function (err) {
    if (err) return console.log(err.message, err)
    console.log('done!')
  })
}
