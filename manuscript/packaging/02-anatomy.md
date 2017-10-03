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

The example below contains an annotated a part of *package.json* from my [React component boilerplate](https://github.com/survivejs/react-component-boilerplate):

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

  /* `npm run <name>` - `npm run` to get the available commands */
  "scripts": {
    "start": "webpack-dev-server --env development",

    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",

    "lint:js": "eslint . --ext .js --ext .jsx --ignore-path .gitignore --ignore-pattern dist --cache",

    "gh-pages": "webpack --env gh-pages",
    "gh-pages:deploy": "gh-pages -d gh-pages",
    "gh-pages:stats": "webpack --env gh-pages --json > stats.json",

    "dist:all": "npm run dist && npm run dist:min",
    "dist": "webpack --env dist",
    "dist:min": "webpack --env dist:min",
    "dist:modules": "rimraf ./dist-modules && babel ./src --out-dir ./dist-modules",

    "pretest": "npm run lint:js",
    "preversion": "npm run test && npm run dist:all && git commit --allow-empty -am \"Update dist\"",
    "prepublish": "npm run dist:modules",
    "postpublish": "npm run gh-pages && npm run gh-pages:deploy",

    /* If your library is installed through Git, transpile it */
    "postinstall": "node lib/post_install.js"
  },

  /* Entry point for terminal (i.e., <package name>). */
  /* Don't set this unless you intend to allow Command line usage */
  "bin": "bin/index.js",

  /* Entry point (defaults to index.js) */
  "main": "dist-modules/",

  /* ES6 module based entry point for tree shaking bundlers to pick up. */
  /* Apart from the module format, the code should use ES5 otherwise. */
  "module": "dist/",

  /* Files to include to npm distribution. */
  /* Relative patterns like "./src" fail! */
  "files": [
    "dist/"
  ],

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
    "react": ">= 0.11.2 < 16.0.0"
  },

  /* Links to repository, homepage, and issue tracker */
  "repository": {
    "type": "git",
    "url": "https://github.com/survivejs/react-component-boilerplate.git"
  },
  "homepage": "https://survivejs.github.io/react-component-boilerplate/",
  "bugs": {
    "url": "https://github.com/survivejs/react-component-boilerplate/issues"
  },

  /* Keywords related to package. */
  /* Fill this well to make the package findable. */
  "keywords": [
    "react",
    "reactjs",
    "boilerplate"
  ],

  /* Which license to use */
  "license": "MIT"
}
```

As you can see, *package.json* can contain a lot of information. You can attach non-npm specific metadata there that can be used by tooling. Given this can bloat *package.json*, it's preferable to keep metadata in files of their own.

T> JSON doesn't support comments even though I'm using them above. There are extended notations, such as [Hjson](http://hjson.org/), that do.

TODO: I'd like to see more information about npm scripts here. For example, the way that `start`, `stop` and `test` are shortcuts included which can be triggered without using `run` whereas others must be preceded with `run`. And the way that you can prefix any script with 'pre' or 'post' so that it's run before or after its main script. And whether there are any special implications to the `main:sub` syntax.
TODO: Add an example of a `postinstall` script.

## What Files to Publish

Even though a project can contain a lot of files, not all of them should be published. Besides wasting bandwidth, this can leak personal files to a public registry and is the reason why it's a good idea to maintain a [files](https://docs.npmjs.com/files/package.json#files) array at *package.json* and enumerate which files and directories you want to publish.

You can't find an official recommendation on what files to publish. That said, there are points to consider as [discussed in Stack Overflow](https://stackoverflow.com/questions/25124844/should-i-npmignore-my-tests).

At a minimum, you should distribute the source code needed to run the package. If you have code written using the ES6 standard, you should transpile the code so that it does not lose the ES6 module definitions while everything else is converted to ES5. For the tooling to pick it up, you should point to this version of code through *package.json* `module` field.

You should point package `main` to a fully compiled version that's compatible with Node.

Besides the source, you can consider distributing package *README.md* and *LICENSE*. Any metadata that's required by third-party systems, like Travis, can be safely skipped. Full documentation of the package doesn't have to be included as you can point to the package homepage through its metadata instead.

W> Even though it's possible to tell npm what to exclude from `files` through `!src/*.test.js` kind of definitions, [using negation patterns is not recommended](https://github.com/npm/npm/wiki/Files-and-Ignores#details). Instead, you should use *.npmignore* and include `src/*.test.js` kind of pattern there.

TODO: https://medium.com/@mikeal/modern-modules-d99b6867b8f1

## Conclusion

An npm package contains at least metadata and source. Many of the files that are relevant for development can be skipped in a distribution build to keep downloads fast. Although that's a small issue, it's still good to consider as it doesn't take much effort to filter the files.

You'll learn how to release npm packages in the next chapter.
