# Anatomy of a Package

A minimal npm package should contain metadata in a _package.json_ file and an associated source file (usually _index.js_). In practice, packages contain more than that and you will have at least a license file and the source in various formats.

Often projects contain more files than are required to execute them. To keep package downloads fast, you can exclude files related to documentation and testing as those can be reached through the package site.

## Possible Files

Most of the available npm packages are small and include only a couple of files:

* _index.js_ - On small projects, it's enough to have the code at the root. On larger ones, you likely want to start splitting it up further and push it below a directory. The directory in turn can be compiled in different ways depending on which users you target.
* _package.json_ - npm metadata in JSON format.
* _README.md_ - README is the most important document of your project. It's written in Markdown format and provides an overview. For smallest projects, the full documentation can fit there. It's shown on the package page at _npmjs.com_ and is a good place for "selling" the project for a potential user.
* _LICENSE_ - You can include licensing information within your project. You should point to the license by name from _package.json_ as otherwise, npm gives a warning. If you are using a custom license, you can link to it instead. In commercial projects, you should to set `"private": true` to avoid pushing your work to public inadvertently.

In larger projects, you often find the following files that should be excluded from an npm distribution:

* _CONTRIBUTING.md_ - A guide for potential contributors describing how the code should be developed.
* _CHANGELOG.md_ - This document describes major changes per version. If you do significant API changes, it can be a good idea to cover them here. It's possible to generate the file using Git commit history, provided you write nice enough commits.
* _.travis.yml_ - [Travis CI](https://travis-ci.org/) is a popular continuous integration platform free for open source projects. You can run the tests of your package over multiple systems using it.
* _.gitignore_ - Ignore patterns for Git, i.e., which files shouldn't go under version control. You can ignore npm distribution files here, so they don't clutter your repository.
* _.npmignore_ - Ignore patterns for npm describe which files shouldn't go to your distribution version. A good alternative is to use the [files](https://docs.npmjs.com/files/package.json#files) field at _package.json_. It allows you to maintain a whitelist of files to include into your distribution version.
* _.eslintignore_ - Ignore patterns for ESLint. Again, tool specific.
* _.eslintrc_ - Linting rules.
* _webpack.config.js_ - Depending on the build tool you are using, you likely have configuration related to it.

Also, you likely have separate directories for the source, tests, demos, documentation, and so on.

T> To decrease the size of your dependencies, consider using a tool like [package-config-checker](https://www.npmjs.com/package/package-config-checker). It can pinpoint packages not using the `files` field correctly. Once you know which ones haven't set it, you can consider making Pull Requests (PRs) to those projects.

## Understanding _package.json_

All packages come with a _package.json_ that describes metadata related to them and includes information about the author, links, dependencies, and so on. The [official documentation](https://docs.npmjs.com/files/package.json) covers them in detail.

The examples below contains an annotated a part of _package.json_ from my [React component boilerplate](https://github.com/survivejs/react-component-boilerplate).

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
  /* Fill this well to make the package discoverable. */
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

npm can be used as a task runner through `npm run` interface. Running the command shows all available scripts. npm works so that if you install a dependency, such as webpack, it links _node_modules/.bin_ commands to the environment during the script execution. The scripts are commonly used for different build tasks.

{pagebreak}

Use `pre` and `post` prefixes to group your scripts. For example, _npm run publish_ will try to run `pretest`, `test`, and then `posttest` scripts. In the example below, the convention is used to control what happens when `npm publish` is executed:

**package.json**

```json
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
  "prepublishOnly": "npm run dist:es6 && npm run dist:modules",
  "postpublish": "npm run gh-pages && npm run gh-pages:deploy",

  /* If your library is installed through Git, compile it */
  "postinstall": "node lib/post_install.js"
},
```

Certain scripts, such as `start` and `test`, have shortcuts in npm. Examples:

* `npm t` maps to `npm test` or `npm run test`.
* `npm start` maps to `npm run start`.

npm commands, such as `npm install`, `npm publish` or `npm version`, can have hooks attached to them. In the example above, we have attached functionality to these.

T> The `postinstall` script and how it works is discussed in detail in the _Building Packages_ chapter.

T> Before npm 5, people used `prepublish` instead of `prepublishOnly`. [According to the documentation](https://docs.npmjs.com/misc/scripts), `prepublish` is run also on `npm install`. To overcome this confusing behavior, `prepublishOnly` was implemented.

### Entry Points

The entry points describe how the package should resolve to your source when used from Node or bundler context for example.

**package.json**

```json
/* Entry point for terminal (i.e., <package name>). */
/* Don't set this unless you intend to allow Command line usage */
"bin": "bin/index.js",

/* Entry point (defaults to index.js) */
"main": "dist-modules/",

/* ES6 module based entry point for tree shaking bundlers to use. */
/* The transformation should retain the module definitions while */
/* transforming everything else. */
"module": "dist/",
```

### Dependencies

A package may have different level dependencies. Some will be used only during development, some should be installed to use the package itself. If _peer dependencies_ are used, then it's up to the user to decide which version of a given package to use. The definition guarantees that the package should work within the given version range.

**package.json**

```json
/* Package dependencies needed to use it. */
/* Peer dependencies can work too, see below. */
"dependencies": { ... },

/* Package development dependencies needed to develop/compile it */
"devDependencies": { ... },

/* Package peer dependencies. The consumer fixes exact versions. */
/* In npm3 these don't get installed automatically and it's */
/* up to the user to define which versions to use. */
/* To include RC versions to the range, consider */
/* using a pattern such as ^4.0.0-0 */
"peerDependencies": {
  "lodash": ">= 3.5.0 < 4.0.0",
  "react": ">= 0.11.2 < 17.0.0"
},
```

An npm package comes with different types of dependencies:

* `dependencies` are the direct dependencies a package needs to work. On application level you could list the dependencies of the application code itself. This excludes dependencies needed to build it.
* `devDependencies` are dependencies you need to develop the package. They include packages related to building, testing, and similar tasks. When you install a package from npm, they won't be installed by default. If you run `npm install` on a project locally, npm will install them.
* `peerDependencies` are usually given as version ranges. The idea is to allow the user to decide the exact versions of these dependencies without fixing it to a specific one. The behavior was changed in npm 3. Before that npm install peer dependencies automatically. Now you have to install and include them to your project explicitly.
* `bundledDependencies` are the dependencies that are bundled with the package itself. They are used rarely, though.
* `optionalDependencies` are the dependencies that the user can install but aren't required for the package to work. This is another rare field.

### Links

A package should link to its repository, homepage, and issue tracker. The fields are optional but they are good to have as it will make it easier for the users to find these through npm site.

**package.json**

```json
/* Links to repository, homepage, and issue tracker */
"repository": {
  "type": "git",
  "url": "https://github.com/<organization/user>/<project>.git"
},
"homepage": "https://<organization/user>.github.io/<project>/",
"bugs": {
  "url": "https://github.com/<organization/user>/<project>/issues"
}
```

### Other Fields

As you can see, _package.json_ can contain a lot of information. You can attach non-npm specific metadata there that can be used by tooling. Given this can bloat _package.json_, it's preferable to keep metadata in files of their own.

T> JSON doesn't support comments even though I'm using them above. There are extended notations, such as [Hjson](http://hjson.org/), that do.

## What Files to Publish

Even though a project can contain a lot of files, not all should be published. Besides wasting bandwidth, this can leak personal files to a public registry. This is why it's a good idea to maintain a [files](https://docs.npmjs.com/files/package.json#files) array at _package.json_ and enumerate which files and directories you want to publish.

You can't find an official recommendation on what files to publish. That said, there are points to consider as [discussed in Stack Overflow](https://stackoverflow.com/questions/25124844/should-i-npmignore-my-tests).

At a minimum, you should distribute the source code needed to run the package. If you have code written using the ES6 standard, you should compile the code so that it does not lose the ES6 module definitions while everything else is converted to ES5. For the tooling to pick it up, you should point to this version of code through _package.json_ `module` field.

You should point package `main` to a fully compiled version that's compatible with Node.

Besides the source, you can consider distributing package _README.md_ and _LICENSE_. Any metadata that's required by third-party systems, like Travis, can be safely skipped. Full documentation of the package doesn't need to be included as you can point to the package homepage through its metadata instead.

W> Even though it's possible to tell npm what to exclude from `files` through `!src/*.test.js` kind of definitions, [using negation patterns is not recommended](https://github.com/npm/npm/wiki/Files-and-Ignores#details). Instead, you should use _.npmignore_ and include `src/*.test.js` kind of pattern there.

{pagebreak}

## Conclusion

An npm package contains at least metadata and source. Many of the files that are relevant for development can be skipped in a distribution build to keep downloads fast. Although that's a small issue, it's still good to consider as it doesn't take much effort to filter the files.

You'll learn how to publish npm packages in the next chapter.

T> As browsers have evolved to support new features of JavaScript, Node is still catching up. This brings the problem of polyfilling. Ideally we would author code in modern features. [Mikeal Rogers states](https://medium.com/@mikeal/modern-modules-d99b6867b8f1) that we should polyfill for older Node and not let it hold the ecosystem back.
