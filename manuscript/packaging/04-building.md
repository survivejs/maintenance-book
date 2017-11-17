# Building Packages

While publishing packages, you have a few concerns to worry about:

* Which browsers and Node versions to support?
* What to do if we want to use language features that aren't supported by these targets?
* What to do if we want to use another language than JavaScript to author our package?
* How to support modern module bundlers and their tree shaking features?

If you author your packages using a source format that works directly with Node, you can avoid additional processing. In this case it's enough to point _package.json_ `main` field to the source as discussed in the previous chapter.

If you support only the newest [LTS (Long-term support) version](https://github.com/nodejs/LTS), you can use [new features of the language](http://node.green/) without having to compile the code in any way.

That said, if you prefer to use features that are not supported by LTS yet or want to support features like **tree shaking**, you have extra effort ahead of you. In this case you have to compile your code in a specific way.

{pagebreak}

## Communicating Where Code Should Work

To communicate in which Node environments your package should work, you should set _package.json_ `engines` field. It accepts a range in a similar way as for dependencies. Consider the example adapted from [npm documentation](https://docs.npmjs.com/files/package.json#engines):

**package.json**

```json
"engines": {
  "node": ">= 4"
}
```

The same idea works for npm version and you can control it by setting `engines.npm` field like `engines.node` above.

You can also document operating system in which the code should run through the `os` field. You can specify the CPU architecture through the `cpu` field. Both of these are niche cases and come into play only if you have platform specific code.

## Compiling to Support Specific Environments

[Babel](https://babeljs.io/) is a popular JavaScript compiler that allows you to transform future code into a format that works in legacy environments. It can be used through Node, [a CLI client](https://www.npmjs.com/package/babel-cli), or available task runners and bundlers.

Additionally you have to configure Babel to use specific plugins or presets. [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) allows you to define which environments you want to support and can use the right plugins while generating the minimal code required.

During this process, it will also shim the code appropriately so that the features work as they should. It's important to note that the shimming process isn't perfect and you may still have to include [Babel polyfill](https://babeljs.io/docs/usage/polyfill/) or at least advice consumers to use it.

To configure _babel-preset-env_ to work with Node, set it up as follows:

**.babelrc**

```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "node": "4"
        }
      }
    ]
  ]
}
```

After this change, Babel will pick up any features not supported by the specified version and transform them into a form that works.

To see the configuration in action, install **babel-cli** to your project, and invoke `babel ./src --out-dir ./lib`. The command picks up the source and writes it below `./lib` directory. You should set `"main": "lib",` and also ignore `lib` at **.gitignore** to avoid including it in source control by accident.

To make sure the code gets generated before you publish it to npm, set up hooks as below:

**package.json**

```json
"scripts": {
  ...
  "build": "babel ./src --out-dir ./lib",
  "preversion": "npm test",
  "prepublishOnly": "npm run build"
},
```

The code should work in the current Node after these changes. There's one problem, though. If you try to consume a package that relies on a build script like this, it won't work if you try to use it directly through Git. For this reason customization is required.

T> It can be convenient to set up a watch process using `babel --watch` to generate the build during development. [npm-watch](https://www.npmjs.com/package/npm-watch) gives more control if needed.

## Generating a Build on `postinstall`

To consume a package like this from Git, you have to make sure the consumer can generate the missing build. To make this happen, you have to write a small `postinstall` script that does exactly this. To get started, point the hook to a custom script:

**package.json**

```json
"scripts": {
  ...
  /* Point to the script that generates the missing source. */
  "postinstall": "node lib/postinstall.js"
},
```

{pagebreak}

Write a script as below that will check if a build exists and then generates it if it doesn't:

**lib/postinstall.js**

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
    stdio: 'inherit',
  });
}
```

After these two steps, you have a build that should work regardless whether consume it through npm or not.

## Configuring Babel for Tree Shaking

Certain tools, like webpack or Rollup, support **tree shaking**. It's a form of **dead code elimination** (DCE) that relies on detecting which parts of the code are being used and which are not. The process relies on **static analysis** meaning it goes through the source, detects module imports and exports exist, checks which are being used, and drops the code of those that are not.

To make this possible, you have to use the ES6 module definition as it's possible to analyze code relying on it exactly like this. CommonJS definition is too dynamic for proper analysis. That's a problem in the configuration above as it converts the possible ES6 code to CommonJS given that's what Node supports.

For this reason, you have to set up another process to generate tree shaking compatible code. You have to disable its module processing in Babel for this reason. Also, you have to point **package.json** `module` field to the generated source. The existing tooling relies on this convention and can pick up the tree-shakeable code if the field is set.

The technique requires two steps. Set up helper scripts first:

**package.json**

```json
"scripts": {
  ...
leanpub-start-delete
  "build": "babel ./src --out-dir ./lib",
  "preversion": "npm test",
  "prepublishOnly": "npm run build"
leanpub-end-delete
leanpub-start-insert
  "build:all": "npm run build && npm run build:tree-shaking",
  "build:tree-shaking": "cross-env BABEL_ENV=tree-shaking
    babel ./src --out-dir ./dist-modules",
  "build": "cross-env BABEL_ENV=build babel ./src --out-dir ./lib",
  "preversion": "npm test",
  "prepublishOnly": "npm run build:all"
leanpub-end-insert
},
```

W> The example relies on the _cross-env_ tool discussed later in this chapter. If you are on Unix only, you can skip it.

To make sure Babel's module processing gets disabled during processing, set it up as follows:

**.babelrc**

```json
{
  ...
  "env": {
    "tree-shaking": {
      "presets": [
        "env",
        {
          "targets": {
            "node": "current"
          }
        }
      ]
    }
    "tree-shaking": {
      "presets": [
        "env",
        {
          "modules": false,
          "targets": {
            "node": "current"
          }
        }
      ]
    }
  }
}
```

Now it should build both a version of the package for Node and a version for tree shaking compatible environments. You should make the _postinstall_ script point at `build:all` to build both targets to finish the setup.

T> There is [an experimental CommonJS based tree shaking approach for webpack](https://www.npmjs.com/package/webpack-common-shake).

## Using Other Languages than JavaScript

You cannot avoid a compilation process as above with languages other than JavaScript. The idea is similar and in this case you may end up with additional build artifacts, such as type definitions, that you may want to include in the distributed version of the package.

T> The _Typing_ chapter covers a few popular options including Flow and TypeScript.

## Cross-Platform Concerns

To make sure your npm scripts work across different platforms, you cannot rely on environment specific tools. This can be solved by using a task runner to hide the differences. Alternately, you can use a collection of npm packages which expose small CLI interface. The list below contains several of them:

* [cpy-cli](https://www.npmjs.com/package/cpy-cli) - Copy files and folders.
* [cross-env](https://www.npmjs.com/package/cross-env) - Set environment variables.
* [mkdirp](https://www.npmjs.com/package/mkdirp) - _mkdirp_ equals to Unix `mkdir -p <path>` which creates all directories given to it. A normal `mkdir <path>` would fail if any of the parents are missing. `-p` stands for `--parents`.
* [npm-run-all](https://www.npmjs.com/package/npm-run-all) - Running npm scripts in series and parallel is problematic as there's no native support for that and you have to rely on OS level semantics. _npm-run-all_ solves this problem by hiding it behind a small CLI interface. Example: `npm-run-all clean build:*`.
* [rimraf](https://www.npmjs.com/package/rimraf) - _rimraf_ equals to `rm -rf <path>` which in Unix terms removes the given path and its contents without any confirmation. The command is both powerful and dangerous.
* [fs-extra](https://www.npmjs.com/package/fs-extra) - _fs-extra_ extends Node `fs` module with commonly needed utilities. It works as a drop-in replacement to it.

## Conclusion

If you are developing only against Node and use exactly the features it supports, you can skip the bundling step. Once you want to use features not available in Node yet, you have to compile your code at least. In case you want to make it possible to consume your package through Git or want to provide standalone bundles, additional effort is required.

You'll learn how to generate standalone versions of your npm packages in the next chapter.
