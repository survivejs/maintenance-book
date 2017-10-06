# Anatomy of a Package

A minimal npm package should contain metadata in a *package.json* file and an associated source file (usually *index.js*). In practice, packages contain more than that and you will have at least a license file and possibly the source in various formats.

Often projects contain more files than are required to execute them. To keep package downloads fast, you can exclude files related to documentation and testing as those can be reached through the package site.

## Possible Files

Most of the available npm packages are small and include only a couple of files:

* *index.js* - On small projects, it's enough to have the code at the root. On larger ones, you likely want to start splitting it up further and push it below a directory. The directory in turn can be compiled in different ways depending on which users you target.
* *package.json* - npm metadata in JSON format.
* *README.md* - README is the most important document of your project. It's written in Markdown format and provides an overview. For smallest projects, the full documentation can fit there. It's shown on the package page at *npmjs.com* and is a good place for "selling" the project for a potential user.
* *LICENSE* - You can include licensing information within your project. You should refer to the license by name from *package.json* as otherwise, npm gives a warning. If you are using a custom license, you can link to it instead. In commercial projects, you should to set `"private": true` to avoid pushing your work to public inadvertently.

In larger projects, you often find the following files that should be excluded from an npm distribution:

* *CONTRIBUTING.md* - A guide for potential contributors describing how the code should be developed.
* *CHANGELOG.md* - This document describes major changes per version. If you do significant API changes, it can be a good idea to cover them here. It's possible to generate the file based on Git commit history, provided you write nice enough commits.
* *.travis.yml* - [Travis CI](https://travis-ci.org/) is a popular continuous integration platform that is free for open source projects. You can run the tests of your package over multiple systems using it.
* *.gitignore* - Ignore patterns for Git, i.e., which files shouldn't go under version control. You can ignore npm distribution files here, so they don't clutter your repository.
* *.npmignore* - Ignore patterns for npm describe which files shouldn't go to your distribution version. A good alternative is to use the [files](https://docs.npmjs.com/files/package.json#files) field at *package.json*. It allows you to maintain a whitelist of files to include into your distribution version.
* *.eslintignore* - Ignore patterns for ESLint. Again, tool specific.
* *.eslintrc* - Linting rules. You can use *.jshintrc* and such based on your preferences.
* *webpack.config.js* - Depending on the build tool you are using, you likely have configuration related to it.

Also, you likely have separate directories for the source, tests, demos, documentation, and so on.

T> If you want to decrease the size of your dependencies, consider using a tool like [package-config-checker](https://www.npmjs.com/package/package-config-checker). It can pinpoint packages not using the `files` field correctly. Once you know which ones haven't set it, you can consider making Pull Requests (PRs) to those projects.

## Understanding *package.json*

All packages come with a *package.json* that describes metadata related to them and includes information about the author, links, dependencies, and so on. The [official documentation](https://docs.npmjs.com/files/package.json) covers them in detail.

The examples below contains an annotated a part of *package.json* from my [React component boilerplate](https://github.com/survivejs/react-component-boilerplate).

### Description Fields

The description fields describe who created the package, what it does, related keywords, and more.

**package.json**

```json
{
  /* Name of the project */
  "name": "react-component-boilerplate",

  /* Brief description */
  "description": "Boilerplate for React.js components",

  /* Who is the author + optional email + optional site */
  "author": "Juho Vepsäläinen <email goes here> (site goes here)",

  /* Version of the package */
  "version": "0.0.0",

  /* Keywords related to package. */
  /* Fill this well to make the package findable. */
  "keywords": [
    "react",
    "reactjs",
    "boilerplate"
  ],

  /* Which license to use */
  "license": "MIT"

  /* Files to include to npm distribution. */
  /* Relative patterns like "./src" fail! */
  "files": [
    "dist/"
  ],

  ...
}
```

### Scripts

npm can be used as a task runner through `npm run` interface. Running the command shows all available scripts. npm works so that if you install a dependency, such as webpack, it links *node_modules/.bin* commands to the environment during the script execution. The scripts are commonly used for different build tasks.

Use `pre` and `post` prefixes to group your scripts. For example, *npm run publish* will try to run `pretest`, `test`, and then `posttest` scripts. In the example below, the convention is used to control what happens when `npm publish` is executed.

**package.json**

```json
{
  ...

  /* `npm run <name>` - `npm run` to get the available commands */
  "scripts": {
    "start": "catalog start docs",

    /* Namespacing (namespace:task) is a convention used for */
    /* grouping. npm doesn't do anything with the information. */
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:lint": "eslint . --ignore-path .gitignore",

    "gh-pages": "catalog build docs",
    "gh-pages:deploy": "gh-pages -d docs/build",

    "dist:es6": "del-cli ./dist-es6 &&
      cross-env BABEL_ENV=es6 babel ./src --out-dir ./dist-es6",
    "dist:modules": "del-cli ./dist-modules &&
      cross-env BABEL_ENV=modules babel ./src --out-dir ./dist-modules",

    "preversion": "npm run test",
    "prepublish": "npm run dist:es6 && npm run dist:modules",
    "postpublish": "npm run gh-pages && npm run gh-pages:deploy",

    /* If your library is installed through Git, compile it */
    "postinstall": "node lib/post_install.js"
  },

  ...
}
```

Certain scripts, such as `start` and `test`, have shortcuts in npm. Examples:

* `npm t` maps to `npm test` or `npm run test`.
* `npm start` maps to `npm run start`.

To show the `postinstall` script, consider below:

```javascript
/* eslint-disable */
// adapted based on rackt/history (MIT)
// Node 4+
const execSync = require('child_process').execSync;
const fs = require('fs');

// This could be read from package.json
const distDirectory = 'dist-modules';

fs.stat(distDirectory, (error, stat) => {
  if (error || !stat.isDirectory()) {
    // Create a directory to avoid getting stuck
    // in postinstall loop
    fs.mkdirSync(distDirectory);
    exec('npm install --only=dev');
    exec('npm run build');
  }
});

function exec(command) {
  execSync(command, {
    // Print stdin/stdout/stderr
    stdio: 'inherit'
  });
}
```

### Entry Points

The entry points describe how the package should resolve to your source based on the context in which it's being used.

**package.json**

```json
{
  ...

  /* Entry point for terminal (i.e., <package name>). */
  /* Don't set this unless you intend to allow Command line usage */
  "bin": "bin/index.js",

  /* Entry point (defaults to index.js) */
  "main": "dist-modules/",

  /* ES6 module based entry point for tree shaking bundlers to pick up. */
  /* Apart from the module format, the code should use ES5 otherwise. */
  "module": "dist/",

  ...
}
```

### Dependencies

A package may have different level dependencies. Some will be used only during development, some should be installed to use the package itself. If *peer dependencies* are used, then it's up to the user to decide which version of a given package to use. The definition guarantees that the package should work within the given version range.

**package.json**

```json
{
  ...

  /* Package dependencies needed to use it. */
  /* Peer dependencies can work too, see below. */
  "dependencies": { ... },

  /* Package development dependencies needed to develop/compile it */
  "devDependencies": { ... },

  /* Package peer dependencies. The consumer fixes exact versions. */
  /* In npm3 these don't get installed automatically and it's */
  /* up to the user to define which versions to use. */
  /* If you want to include RC versions to the range, consider */
  /* using a pattern such as ^4.0.0-0 */
  "peerDependencies": {
    "lodash": ">= 3.5.0 < 4.0.0",
    "react": ">= 0.11.2 < 17.0.0"
  },

  ...
}
```

### Links

A package should link to its repository, homepage, and issue tracker. The fields are optional but they are good to have as it will make it easier for the users to find these through npm site.

**package.json**

```json
{
  ...

  /* Links to repository, homepage, and issue tracker */
  "repository": {
    "type": "git",
    "url": "https://github.com/survivejs/react-component-boilerplate.git"
  },
  "homepage": "https://survivejs.github.io/react-component-boilerplate/",
  "bugs": {
    "url": "https://github.com/survivejs/react-component-boilerplate/issues"
  }
}
```

### Other Fields

As you can see, *package.json* can contain a lot of information. You can attach non-npm specific metadata there that can be used by tooling. Given this can bloat *package.json*, it's preferable to keep metadata in files of their own.

T> JSON doesn't support comments even though I'm using them above. There are extended notations, such as [Hjson](http://hjson.org/), that do.

## What Files to Publish

Even though a project can contain a lot of files, not all of them should be published. Besides wasting bandwidth, this can leak personal files to a public registry and is the reason why it's a good idea to maintain a [files](https://docs.npmjs.com/files/package.json#files) array at *package.json* and enumerate which files and directories you want to publish.

You can't find an official recommendation on what files to publish. That said, there are points to consider as [discussed in Stack Overflow](https://stackoverflow.com/questions/25124844/should-i-npmignore-my-tests).

At a minimum, you should distribute the source code needed to run the package. If you have code written using the ES6 standard, you should compile the code so that it does not lose the ES6 module definitions while everything else is converted to ES5. For the tooling to pick it up, you should point to this version of code through *package.json* `module` field.

You should point package `main` to a fully compiled version that's compatible with Node.

Besides the source, you can consider distributing package *README.md* and *LICENSE*. Any metadata that's required by third-party systems, like Travis, can be safely skipped. Full documentation of the package doesn't have to be included as you can point to the package homepage through its metadata instead.

W> Even though it's possible to tell npm what to exclude from `files` through `!src/*.test.js` kind of definitions, [using negation patterns is not recommended](https://github.com/npm/npm/wiki/Files-and-Ignores#details). Instead, you should use *.npmignore* and include `src/*.test.js` kind of pattern there.

## Conclusion

An npm package contains at least metadata and source. Many of the files that are relevant for development can be skipped in a distribution build to keep downloads fast. Although that's a small issue, it's still good to consider as it doesn't take much effort to filter the files.

You'll learn how to release npm packages in the next chapter.

T> As browsers have evolved to support new features of JavaScript, Node is still catching up. This brings the problem of polyfilling. Ideally we should be able to author code in modern features. [Mikeal Rogers states](https://medium.com/@mikeal/modern-modules-d99b6867b8f1) that we should polyfill for older Node and not let it hold the ecosystem back.
