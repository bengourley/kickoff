module.exports = generate

var mkdirp = require('mkdirp')
  , tmp = require('tmp')
  , path = require('path')
  , fs = require('fs')
  , template = require('lodash.template')
  , glob = require('glob')
  , exec = require('child_process').exec
  , async = require('async')
  , logga = require('logga')({ logLevel: 'debug', timeOnly: true })

function generate(cwd, destinationPath, settings, cb) {

  var logger = logga.setContext(path.basename(cwd))

  tmp.dir({ prefix: 'generator-' }, function (err, tmpPath) {
    if (err) return cb(err)
    logger.trace('Creating tmp path for generated files', tmpPath)
    writeFilesVerbatim(tmpPath)
    writeFilesFromTemplates(tmpPath, settings)
    mkdirp.sync(destinationPath)
    async.each(glob.sync('**/*', { cwd: tmpPath }), superImpose.bind(null, tmpPath), cb)
  })

  function writeFilesVerbatim(tmpPath) {
    glob.sync('**/*', { cwd: cwd + '/source' }).forEach(function (filename) {
      fs.writeFileSync(path.join(tmpPath, filename), fs.readFileSync(path.join(cwd + '/source', filename)))
    })
  }

  function writeFilesFromTemplates(tmpPath, settings) {
    glob.sync('**/*', { cwd: cwd + '/templates' }).forEach(function (filename) {
      var dest = path.join(tmpPath, filename.replace(/\.tpl$/, ''))
        , src = path.join(cwd + '/templates', filename)
      fs.writeFileSync(dest, template(fs.readFileSync(src), settings))
    })
  }

  function superImpose(tmpPath, filename, cb) {

    logger.info('Superimposing ' + filename)

    var srcFilepath = path.join(tmpPath, filename)
      , destFilePath = path.join(destinationPath, filename)

    logger.debug('Does it exist already?')
    if (!fs.existsSync(destFilePath)) {
      logger.debug('No.')
      logger.info('Creating new file.', filename)
      fs.writeFileSync(destFilePath, fs.readFileSync(srcFilepath))
      return cb(null)
    }

    logger.debug('Yes.')
    logger.info('Creating diff and applying patch.')
    logger.trace('diff -u ' + srcFilepath + ' ' + destFilePath + ' | patch ' + destFilePath)
    exec('diff -u ' + destFilePath + ' ' + srcFilepath + ' | patch ' + destFilePath, function (err) {
      if (err) return cb(err)
      cb(null)
    })

  }

}
