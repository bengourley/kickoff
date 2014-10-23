{
  "name": "<%= projectName %>",
  "description": "<%= projectDescription %>",
  "main": "app",
  "organization": "<%= organization %>",
  "author": "<%= organization %>",
  "version": "0.0.0",
  "licence": "Clock Open",
  "private": true,
  "scripts": {
    "run": "pliers go",
    "lint": "jshint . --reporter=./node_modules/jshint-full-path/index.js",
    "checkStyle": "jscs .",
    "wrap": "npm install && rm -rf npm-shrinkwrap.json ; npm prune && npm dedupe && npm install && npm shrinkwrap && pliers cleanShrinkwrap",
    "pretest": "npm run-script lint && npm run-script checkStyle",
    "test": "istanbul cover test/test-runner.js",
    "posttest": "istanbul check-coverage && rm -rf coverage",
    "postinstall": "pliers -a build"
  },
  "dependencies": {
  },
  "devDependencies": {
  }
}
