kickoff
=======

Prototyping project generators.

This is a quick prototype for an idea I had for project generators with inheritance using `diff` and `patch`.

- Projects inherit from one another with JS prototypal inheritance. This means the lineage must be linear (i.e. a generator cannot inherit from multiple generators). This may or may not be a limitation. We'll see!
- There is a generate() function which does most of the heavy lifting. It does this:
  1. make a tmp directory
  2. copy over verbatim files from `generator-root/source` to tmp directory
  3. render templated files from `generator-root/templates` (uses `lodash.template`) to tmp directory
  4. compare files in tmp with destination one by one:
    - if file does not yet exist, copy it
    - if file already exists, diff the new version with what's currently there to generate a patch, then apply the patch to the existing file


## Using the examples

Checkout the project and install the dependencies:

```
git clone git@github.com:bengourley/kickoff.git
cd kickoff
npm i
```

### generator-node-project

This project doesn't inherit anything.

```
node generator-node-project/generator
```

It should prompt you for some details, then create a `package.json` and `app.js` in `generator-node-project/new-project`. It should tell you what it did.


### generator-cms

This project inherits from `generator-node-project`.

```
node generator-cms/generator
```

It should prompt you for some details (a few more than before), then create a `package.json` and `app.js` in `generator-cms/new-project`. It should tell you what it did. You should see that the contents off `app.js` have been updated.


Feedback welcome! Open issues for discussion.
