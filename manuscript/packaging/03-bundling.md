# Bundling Packages

If you author your packages using a source format that works directly with Node, you can avoid additional processing. In this case it's enough to point *package.json* `main` field to the source as discussed in the previous chapter.

If you support only the newest [LTS (Long-term support) version](https://github.com/nodejs/LTS), you can use [new features of the language](http://node.green/) without having to compile the code in any way.

That said, if you prefer to use features that are not supported by LTS yet or want to support features like **tree shaking**, you have extra effort ahead of you. In this case you have to compile your code.

## Communicating Where Code Should Work

To communicate in which Node environments your package should work, you should set *package.json* `engines` field. It accepts a range in a similar way as for dependencies. Consider the example adapted from [npm documentation](https://docs.npmjs.com/files/package.json#engines):

```json
{
  "engines": {
    "node": ">= 4"
  }
}
```

The same idea works for npm version and you can control it by setting `engines.npm` field like `engines.node` above.

You can also document operating system in which the code should run through the `os` field. You can specify the CPU architecture through the `cpu` field. Both of these are niche cases and come into play only if you have platform specific code that is compiled for example.

## Babel

[Babel](https://babeljs.io/) is a popular JavaScript compiler that allows you to transform future code into a format that works in legacy environments. It can be used through Node, [a CLI client](https://www.npmjs.com/package/babel-cli), or available task runners and bundlers.

In addition to a method to run, you will have to configure Babel to use specific plugins or presets. [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) allows you to define which environments you want to support and can use the right plugins based on the definition and generate the minimal code required.

During this process, it will also shim the code appropriately so that the features work as they should. It's important to note that the shimming process isn't perfect and you may still have to include [Babel polyfill](https://babeljs.io/docs/usage/polyfill/) to the end result or at least advice consumers to use it.

To configure *babel-preset-env* to work with Node, set it up as follows:

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
  "prepublish": "npm run build"
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
    stdio: 'inherit'
  });
}
```

After these two steps, you have a build that should work whether or not you consume it through npm or not.

### Configuring Babel for Tree Shaking

Certain tools, like webpack or Rollup, support **tree shaking**. It's a form of **dead code elimination** (DCE) that relies on detecting which parts of the code are being used and which are not. The process relies on **static analysis** meaning it goes through the source, detects module imports and exports exist, checks which are being used, and drops the code of those that are not.

To make this possible, you have to use the ES6 module definition as it's possible to analyze code relying on it exactly like this. CommonJS definition is too dynamic for proper analysis. That's a problem in the configuration above as it converts the possible ES6 code to CommonJS given that's what Node supports at the moment.

For this reason, you have to set up another process to generate tree shaking compatible code. When it comes to Babel, you have to disable its module processing. Also, you have to point **package.json** `module` field to the generated source. The existing tooling relies on this convention and can pick up the tree-shakeable code based on the field.

The technique requires two steps. Set up a helper scripts first:

**package.json**

```json
"scripts": {
  ...
leanpub-start-delete
  "build": "babel ./src --out-dir ./lib",
  "preversion": "npm test",
  "prepublish": "npm run build"
leanpub-end-delete
leanpub-start-insert
  "build:all": "npm run build && npm run build:tree-shaking",
  "build:tree-shaking": "BABEL_ENV=tree-shaking babel ./src --out-dir ./dist-modules",
  "build": "BABEL_ENV=build babel ./src --out-dir ./lib",
  "preversion": "npm test",
  "prepublish": "npm run build:all"
leanpub-end-insert
},
```

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

Now it should build both a version of the package for Node and a version for tree shaking compatible environments. To perfect the solution, you should make the *postinstall* script point at `build:all` to build both targets.

T> There is [an experimental CommonJS based tree shaking solution for webpack](https://www.npmjs.com/package/webpack-common-shake).

## Generating Standalone Builds

The scenarios covered so far are enough if you consume packages through npm. That is not the case always, though. If you want to consume a package directly through the browser, you have to generate bundles that the browser can consume. This is where **bundlers** such as [Browserify](http://browserify.org/), [Rollup](https://rollupjs.org/), [Fusebox](http://fuse-box.org/), or [webpack](https://webpack.js.org/), come in handy.

### How Bundlers Work?

![Bundling process](images/bundler.png)

A **bundler** is a transformation tool that takes the given source, performs given operations on it, and emits **bundles** as output. Bundles contain the manipulated source in such form that the code can be executed in the wanted environment. The process begins from **entry points** which are modules pointing to possibly other modules.

Depending on the bundler, you have varying degrees of control over the process. Application-oriented bundlers like webpack allow you to define **split points** which generate dynamically loaded bundles. The feature can be used to defer loading of certain functionality and it enables powerful application development patterns such as [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/).

T> [Webpack and Rollup: the same but different](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c) explains how webpack and Rollup differ. To summarize, webpack works better for applications while Rollup is a better choice for libraries.

T> You can also use webpack and Rollup together through [rollup-loader](https://www.npmjs.com/package/rollup-loader) and leave JavaScript handling to Rollup as this enables tree shaking through Rollup and allows you to use Rollup specific plugins.

T> Both webpack and Rollup support *scope hoisting*. It's a performance oriented feature that pulls modules into a single scope instead of writing separate scope for each module. This reduces the overhead related to function calls.

## Universal Module Definition (UMD)

To make the generated bundle work in different environments, bundlers support [Universal Module Definition](https://github.com/umdjs/umd) (UMD). The UMD wrapper allows the code to be consumed from different environments including the browser (global), [Asynchronous Module Definition](http://requirejs.org/docs/whyamd.html) (AMD), and CommonJS. AMD is an older format that's still being used in legacy projects.

UMD isn't as relevant anymore as it used to be in the past but it's good to be aware of the format as you come around it.

### Generating a Build Using Rollup

To illustrate bundling and UMD, set up an entry point for the demo as below:

**index.js**

```javascript
function demo() {
  console.log('demo');
}

export default demo;
```

Define a small **package.json** to contain the build script:

**package.json**

```json
{
  "name": "umd-demo",
  "main": "index.js",
  "scripts": {
    "build": "rollup ./index.js --format umd --name Demo --output dist/demo.umd.js"
  }
}
```

Install Rollup to the project:

```bash
npm install rollup --save-dev
```

To prove that the setup works, execute `npm run build` and examine the generated **./dist** directory. It should contain a new file with transformed code and the UMD wrapper. You can import the file from Node REPL like this:

```bash
node
> require('./dist/demo.umd')()
demo
undefined
```

The same build should also work from the browser or as a part of an AMD build.

T> You can achieve a similar result with other tools as well. The specifics will differ depending on the tool, but the basic idea is always the same.

## Cross-Platform Concerns

To make sure your npm scripts work across different platforms, you cannot rely on environment specific tools. This can be solved by using a task runner to hide the differences. Alternately, you can use a collection of npm packages which expose small CLI interface. The list below contains several of them:

* [cpy-cli](https://www.npmjs.com/package/cpy-cli) - Copy files and folders.
* [cross-env](https://www.npmjs.com/package/cross-env) - Set environment variables.
* [mkdirp](https://www.npmjs.com/package/mkdirp) - *mkdirp* equals to Unix `mkdir -p <path>` which creates all directories given to it. A normal `mkdir <path>` would fail if any of the parents are missing. `-p` stands for `--parents`.
* [npm-run-all](https://www.npmjs.com/package/npm-run-all) - Running npm scripts in series and parallel is problematic as there's no native support for that and you have to rely on OS level semantics. *npm-run-all* solves this problem by hiding it behind a small CLI interface. Example: `npm-run-all clean build:*`.
* [rimraf](https://www.npmjs.com/package/rimraf) - *rimraf* equals to `rm -rf <path>` which in Unix terms removes the given path and its contents without any confirmation. The command is both powerful and dangerous.
* [fs-extra](https://www.npmjs.com/package/fs-extra) - *fs-extra* extends Node `fs` module with commonly needed utilities. It works as a drop-in replacement to it.

## Conclusion

If you are developing only against Node and use exactly the features it supports, you can skip the bundling step. Once you want to use features not available in Node yet, you have to compile your code at least. In case you want to make it possible to consume your package through Git or want to provide standalone bundles, additional effort is required.

You'll learn how to release npm packages in the next chapter.
