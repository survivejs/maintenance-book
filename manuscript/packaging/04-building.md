# Building Packages

While publishing packages, you have a few concerns to worry about:

* Which browsers and Node versions to support?
* What to do if we want to use language features that aren’t supported by these targets?
* What to do if we want to use another language than JavaScript to author our package?
* How to support modern module bundlers and their tree shaking features?

If you author your packages using a source format that works directly with Node, you can avoid additional processing. In this case it’s enough to point _package.json_ `main` field to the source as discussed in the previous chapter.

If you support only the newest [LTS (Long-term support) version](https://github.com/nodejs/LTS), you can use [new features of the language](http://node.green/) without having to compile the code in any way.

That said, if you prefer to use features that are not supported by LTS yet or want to support features like **tree shaking**, you have extra effort ahead of you. In this case you have to compile your code in a specific way.

{pagebreak}

## Communicating Where Code Should Work

To communicate in which Node environments your package should work, you should set _package.json_ [engines](https://docs.npmjs.com/files/package.json#engines) field. It accepts a range in a similar way as for dependencies:

**package.json**

```json
"engines": {
  "node": ">= 6"
}
```

The same idea works for npm version and you can control it by setting `engines.npm` field like `engines.node` above.

## Compiling to Support Specific Environments

[Babel](https://babeljs.io/) is a popular JavaScript compiler that allows you to transform future code into a format that works in current environments, such as browsers and Node. You can use it as [a command line tool](https://www.npmjs.com/package/babel-cli), or with task runners and bundlers.

Babel doesn’t do any transformations by default, so you need to enable ones you need to support your target environment. [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) allows you to define which environments you want to support and can use the right plugins while generating the minimal code required.

Let’s install it from npm:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

To configure _@babel/preset-env_ to work with Node 6 and above, set it up as follows:

**babel.config.js**

```js
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 6,
          useBuiltIns: 'usage',
        },
      },
    ],
  ],
};
```

After this change, Babel will transform any features, not supported by the specified Node version, into a form that works.

`useBuiltIns: 'usage'` includes polyfills needed for the feature you are using.

To see the configuration in action, run `babel src --out-dir lib`. It will compile all source files in the `src` folder, and write the result into the `lib` folder. This code should work in Node 6.

To make sure the code gets generated before you publish it to npm, set up hooks as below:

**package.json**

```json
"scripts": {
  "build": "babel --delete-dir-on-start src --out-dir lib",
  "preversion": "npm test",
  "prepublishOnly": "npm run build"
},
```

You should point the `main` field to `lib` in your **package.json**, and also ignore `lib` in **.gitignore** to avoid including it in source control.

T> You may want to avoid compiling and publishing of test files. Tweak your Babel command like this: `babel --delete-dir-on-start --ignore '**/*.spec.js' src --out-dir lib`.

T> It can be convenient to set up a watch process using `babel --watch` to generate the build during development. [npm-watch](https://www.npmjs.com/package/npm-watch) gives more control if needed.

## Generating a Build on `postinstall`

To consume a package like this from Git, you have to make sure the consumer can generate the missing build. To make this happen, you have to write a small `postinstall` script that does exactly this. To get started, point the hook to a custom script:

**package.json**

```json
"scripts": {
  /* Point to the script that generates the missing source. */
  "postinstall": "node lib/postinstall.js"
},
```

{pagebreak}

Write a script as below that will check if a build exists and then generates it if it doesn’t:

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

Some bundlers, like webpack or Rollup, support **tree shaking**. It’s a form of **dead code elimination** that detects which parts of the code are being used and which are not. Tree shaking relies on **static analysis** meaning it goes through the source, detects module imports and exports, checks which are being used, and drops the code of those that are not.

To make this possible, you need to use ECMAScript modules (ESM) as it’s possible to analyze them statically. CommonJS supports dynamic imports (like `require('foo/' + bar)`, which makes static analysis impossible.

The Babel configuration above converts ESM to CommonJS to make it work in Node, so you need to set up another process to generate tree shaking compatible code. You need to disable ESM to CommonJS transformation.

Set up npm scripts:

**package.json**

```json
"scripts": {
leanpub-start-delete
  "build": "babel src --out-dir lib",
  "preversion": "npm test",
  "prepublishOnly": "npm run build"
leanpub-end-delete
leanpub-start-insert
  "build": "npm run build:esm && npm run build:cjs",
  "build:esm": "babel --delete-dir-on-start -d esm/ src/",
  "build:cjs": "babel --delete-dir-on-start --env-name cjs -d lib/ src/",
  "preversion": "npm test",
  "prepublishOnly": "npm run build"
leanpub-end-insert
},
```

Add a new environment to your Babel config:

**babel.config.js**

```js
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
      },
    ],
  ],
  env: {
    cjs: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: 6,
            },
            useBuiltIns: 'usage',
          },
        ],
      ],
    },
  },
};
```

Now running `npm run build` should build a version of the package for Node and a version for tree shaking compatible environments.

**@babel/preset-env** will take target browsers from your [Browserslist](https://github.com/browserslist/browserslist) config, if you omit the `targets` option. So let’s add it to your **package.json**:

```json
"browserslist": [
  ">1%",
  "last 1 version",
  "Firefox ESR",
  "not dead"
],
```

The last thing is to point your **package.json** `module` field to the generated source. Bundlers will pick up the tree-shakeable code if the field is set:

```json
"main": "lib/",
"module": "esm/",
```

T> There is [an experimental CommonJS based tree shaking approach for webpack](https://www.npmjs.com/package/webpack-common-shake).

## Using Other Languages Than JavaScript

You cannot avoid a compilation process as above with languages other than JavaScript. The idea is similar and in this case you may end up with additional build artifacts, such as type definitions, that you may want to include in the distributed version of the package.

T> The _Typing_ chapter covers a few popular options including Flow and TypeScript.

## Cross-Platform Concerns

To make sure your npm scripts work across different platforms, you cannot rely on environment specific tools. This can be solved by using a task runner to hide the differences. Alternately, you can use a collection of npm packages which expose small CLI interface. The list below contains several of them:

* [cpy-cli](https://www.npmjs.com/package/cpy-cli) - Copy files and folders.
* [cross-env](https://www.npmjs.com/package/cross-env) - Set environment variables.
* [mkdirp](https://www.npmjs.com/package/mkdirp) - _mkdirp_ equals to Unix `mkdir -p <path>` which creates all directories given to it. A normal `mkdir <path>` would fail if any of the parents are missing. `-p` stands for `--parents`.
* [npm-run-all](https://www.npmjs.com/package/npm-run-all) - Running npm scripts in series and parallel is problematic as there’s no native support for that and you have to rely on OS level semantics. _npm-run-all_ solves this problem by hiding it behind a small CLI interface. Example: `npm-run-all clean build:*`.
* [rimraf](https://www.npmjs.com/package/rimraf) - _rimraf_ equals to `rm -rf <path>` which in Unix terms removes the given path and its contents without any confirmation. The command is both powerful and dangerous.
* [fs-extra](https://www.npmjs.com/package/fs-extra) - _fs-extra_ extends Node `fs` module with commonly needed utilities. It works as a drop-in replacement to it.

## Conclusion

If you are developing only against Node and use exactly the features it supports, you can skip the bundling step. Once you want to use features not available in Node yet, you have to compile your code at least. In case you want to make it possible to consume your package through Git or want to provide standalone bundles, additional effort is required.

You’ll learn how to generate standalone versions of your npm packages in the next chapter.
