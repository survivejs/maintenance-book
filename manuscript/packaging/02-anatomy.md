# Anatomy of a Package

A minimal npm package should contain metadata in a _package.json_ file and an associated source file (usually _index.js_). In practice, packages contain more than that and you will have at least a license file and the source in various formats.

Often projects contain more files than are required to execute them. To keep package downloads fast, you can exclude files related to documentation and testing as those can be reached through the package site.

## Understanding _package.json_

All packages come with a _package.json_ file that contains package metadata, like information about the author, link to a bug tracker and package dependencies. The [official documentation](https://docs.npmjs.com/files/package.json) covers them in detail.

The examples below is an annotated part of _package.json_ from the SurviveJS [React component boilerplate](https://github.com/survivejs/react-component-boilerplate).

### Description Fields

The description fields describe who created the package, what it does, search keywords, and more.

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

  /* Do not allow publishing, useful for apps or private packages */
  "private": true,

  /* Keywords related to package. */
  /* Fill this well to make the package discoverable. */
  "keywords": ["react", "reactjs", "boilerplate"],

  /* Files to include to npm distribution. */
  /* Relative patterns like "./src" fail! */
  "files": ["dist/"]
}
```

### Scripts

npm can be used as a task runner through `npm run` command. Running the command shows all available scripts. The scripts are commonly used for different build tasks.

**package.json**

```json
/* `npm run <name>` - `npm run` to get the available commands */
{
  "scripts": {
    /* You don’t need to write node_modules/.bin/catalog, npm will */
    /* automatically call locally-installed package. */
    "start": "catalog start docs",

    /* Namespacing (namespace:task) is a convention used for */
    /* grouping. */
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
  }
}
```

Certain scripts, such as `start` and `test`, have shortcuts in npm. Examples:

* `npm t` or `npm test` maps to `npm run test`.
* `npm start` maps to `npm run start`.

npm commands, such as `npm install`, `npm publish` or `npm version`, can have [hooks](https://docs.npmjs.com/misc/scripts) attached to them, like in the example above.

Use `pre` and `post` prefixes to group your scripts. For example, _npm run test_ will try to run `pretest`, `test`, and then `posttest` scripts. In the example above, the feature is used to control what happens when `npm publish` is executed.

Though for npm namespaces (like, `namespace:task`) don’t mean anything, some tools support this convention. For example, [npm-run-all](https://www.npmjs.com/package/npm-run-all) allows you to run all tasks inside a namespace — `npm-run-all dist:*`.

T> The `postinstall` script and how it works is discussed in detail in the _Building Packages_ chapter.

T> Before npm 5, people used `prepublish` instead of `prepublishOnly`. [According to the documentation](https://docs.npmjs.com/misc/scripts), `prepublish` is run also on `npm install`. To overcome this confusing behavior, `prepublishOnly` was implemented.

### Entry Points

The entry points describe how the package should resolve to your code when used from Node or a bundler, like webpack.

If your code is using JavaScript features not supported by Node, or other language like TypeScript, you should compile the code in two ways:

* To ES5, and use this files as the `main` entry point. It will be used by Node.
* To ES5 except ECMAScript modules (ESM), and use it as the `module` entry point. It will be used by bundlers, like webpack. This will allow them to do tree shaking.

**package.json**

```json
{
  /* Entry point for command line interface. */
  /* Don't set this unless you intend to allow command line usage */
  "bin": "bin/index.js",

  /* Main entry point (defaults to index.js) */
  "main": "dist/",

  /* ESM-based entry point for bundlers. */
  "module": "dist-modules/"
}
```

T> Use [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) to apply only necessary transformations for Node versions or browsers you support.

On small projects, it’s enough to have all code in `index.js` in the root folder. On larger ones, you likely want to start splitting it up and move into a directory. Having all code in a directory will make compilation easier.

### Dependencies

An npm package can have different types of dependencies:

* `dependencies` are the direct dependencies a package needs to work. On application level you could list the dependencies of the application code itself. This excludes dependencies needed to build it.
* `devDependencies` are dependencies you need to develop the package. They include packages related to building, testing, and similar tasks. When you install a package from npm, they won’t be installed by default. If you run `npm install` on a project locally, npm will install them.
* `peerDependencies` are usually given as version ranges. The idea is to allow the user to decide the exact versions of these dependencies without locking them to specific ones. The behavior was changed in npm 3. Before that npm install peer dependencies automatically. Now you have to install and include them to your project explicitly.
* `bundledDependencies` are the dependencies that are bundled with the package itself. They are used rarely, though.
* `optionalDependencies` are the dependencies that the user can install but aren’t required for the package to work. This is another rare field.

**package.json**

```json
{
  /* Dependencies required to use the package. */
  "dependencies": {
    /* ... */
  },

  /* Dependencies needed to develop/compile the package. */
  "devDependencies": {
    /* ... */
  },

  /* Package peer dependencies. The consumer chooses exact versions. */
  /* To include RC versions to the range, consider */
  /* using a pattern such as ^4.0.0-0 */
  "peerDependencies": {
    "lodash": ">= 3.5.0 < 4.0.0",
    "react": ">= 0.14.0 < 17.0.0"
  }
}
```

### Links

A package should link to its repository, homepage, and issue tracker. The fields are optional but they are good to have as it will make it easier for the users to find these through npm site.

**package.json**

```json
{
  /* Links to homepage, repository, and issue tracker */
  "homepage": "https://<organization/user>.github.io/<project>/",
  "repository": {
    "type": "git",
    "url": "https://github.com/<organization/user>/<project>.git"
  },
  "bugs": {
    "url": "https://github.com/<organization/user>/<project>/issues"
  }
}
```

If you use GitHub, you can simplify like this:

```json
{
  /* GitHub issues URL will be inferred from the repository URL */
  "homepage": "https://<organization/user>.github.io/<project>/",
  "repository":
    "https://github.com/<organization/user>/<project>.git"
}
```

### License

You should always [specify](https://docs.npmjs.com/files/package.json#license) a license of your package, otherwise people will not know if they are allowed to use it. If you don’t specify any license, it means nobody can use your package.

```json
{
  "license": "MIT"
}
```

You can use an [SPDX license identifier](https://spdx.org/licenses/) or refer to a file with a custom license:

```json
{
  "license": "SEE LICENSE IN <filename>"
}
```

Also GitHub will use this field to show detailed license information in the repository:

![License explanation on GitHub](images/github-license.png)

T> See [The Legal Side of Open Source](https://opensource.guide/legal/) and [Open source licensing: What every technologist should know](https://opensource.com/article/17/9/open-source-licensing) to know more about licensing.

### Other Fields

As you can see, _package.json_ can contain a lot of information. You can attach non-npm specific metadata there that can be used by tooling. Given this can bloat _package.json_, it’s preferable to keep metadata in files of their own.

W> JSON doesn’t support comments even though I’m using them above. There are extended notations, such as [JSON5](http://json5.org/), that do.

## What Files to Publish

Even though a project can contain a lot of files, not all should be published. Besides wasting bandwidth, this can leak sensitive files to a public registry.

### What Should Be in a Package

Most of the available npm packages are small and include only a couple of files:

* Entry point, like _index.js_.
* _package.json_ - package metadata.
* _README_ - it’s shown on the package page at _npmjs.com_ and is a good place for “selling” the project for a potential user. See the *README* chapter for details.
* _CHANGELOG_, _CHANGES_ or _HISTORY_ - describe changes for each package version. See _Change Logs_ chapter for details.
* _LICENSE_ or _LICENCE_ - license of your package. You should point to the license by name from _package.json_.

These files will be included in your package regardless of the _package.json_ `files` field or `.npmignore` file. _README_, _CHANGELOG_ and _LICENSE_ can have any case and extension.

### What Could Be in a Package

There’s no official recommendations on on what files to publish, except [a list](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package) of files that should be ignored by default or included regardless of your settings (the ones listed above).

The most controversial question is whether you should publish tests and documentation as part of an npm package. There’s a [good Stack Overflow discussion](https://stackoverflow.com/questions/25124844/should-i-npmignore-my-tests).

Same can be said about the source code if you compile it before publishing. These files aren’t required to use the package but may be useful for some users, if they want to compile your code themselves or like to dig into packages on a plane.

### What Should Not Be in a Package

In larger projects, you often find the following files that should be excluded from an npm distribution:

* Tooling configuration, like _.babelrc_, _.eslintrc_, _.travis.yml_ or _webpack.config.js_ — files like _.babelrc_ may easily break your user’s build if they try to compile _node_modules_ folder and don’t have one of the plugins listed in your config.
* Tooling or build artifacts like log files — usually anything you have in _.gitignore_ which npm will use by default unless you have _.npmignore_ file. In the latter case you’ll need to copy these patterns from _.gitignore_.
* File that are required only for development: build scripts or _CONTRIBUTING.md_.
* Any big files, like images.
* Any sensitive data, like npm publishing keys.

T> To decrease the size of your dependencies, use [package-config-checker](https://www.npmjs.com/package/package-config-checker). It can pinpoint packages not using the `files` field correctly. Once you know which ones haven’t set it, consider making pull requests to those projects.

### Including and Ignoring Files

There are two ways to tell npm which files to publish.

### `files` field in _package.json_

Only files or folders listed in the [files](https://docs.npmjs.com/files/package.json#files) field will be published.

**Pros:**

* You’ll never publish a big file or folder accidentally.

**Cons:**

* You may forget to add a new file here and publish a broken package.
* Doesn’t support negative patterns.

W> [npm doesn’t support](https://github.com/npm/npm/wiki/Files-and-Ignores#details) negative glob patterns, like `!src/*.test.js`, in the `files` field, Use _.npmignore_ file with a pattern like `src/*.test.js` instead.

### _.npmignore_ file

Lists glob patterns of files and folders that shouldn’t be published, similar to _.gitignore_ (and _.gitignore_ will be used by npm if there’s no _.npmignore_).

**Pros:**

* Easier to maintain, because new files will be published by default.
* You can have different rules for different subdirectories.
* Supports negative patterns.

**Cons:**

* Easy to accidentally make you package bigger that it could.

## Conclusion

An npm package contains at least metadata and source. Many of the files that are relevant for development can be skipped in a distribution build to keep downloads fast. Although that’s a small issue, it’s still good to consider as it doesn’t take much effort to filter the files.

You’ll learn how to publish npm packages in the next chapter.
