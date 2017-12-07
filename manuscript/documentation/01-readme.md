# README

A project **README** is often the first thing people see when they find the project. The project’s site is another entry point. Often a site is generated from a README file content with nice CSS.

A good README can “sell” the project to a potential user. A badly written or formatted one can scare users away even if the library would solve their problem and has a good API.

## What a README Should Contain

README should describe briefly what the package is about before delving into the details. A high level overview of the functionality and why the package was developed is enough. By doing this well, you save time as it will either attract people that have the same problem or make them understand the package isn’t something they need.

Examples convey how to use the package. Ideally you are able to run them as tests or generate documentation from the real source code. Besides making sure the examples work, this is also a rough way of **acceptance testing**. It’s a good idea to start designing a package by writing the README. This forces you to think about the API carefully from the user point of view and come up with a design you can document easily.

If the package is small, you can include its entire API documentation in the README. For bigger packages it can make sense to split the documentation into several smaller documents. Too big a README can also mean you have to split your package up somehow. This is where the **monorepo** approach may come in handy.

You should include licensing information at the end of the README: people will want to know if they are allowed to use your library in their project. You can also mention sponsors and maintainers there so they get the visibility they have earned. Links to contribution guidelines and code of conduct is another good idea to make them more visible.

## Automating README

### Table of Contents

If your README is big, table of contents will give readers a quick overview of what’s inside. With [markdown-toc](https://github.com/jonschlinkert/markdown-toc) you can keep links in a table of contents correct and up to date:

```markdown
## Table of contents

<!-- To update run: npx markdown-toc --maxdepth 2 -i README.md -->

<!-- toc -->

* [Installation](#installation)
* [Upgrade from v0.4](#upgrade-from-v04)
* [Example](#example)
* [More examples](#more-examples)
* [Custom blocks](#custom-blocks)
* [Available webpack blocks](#available-webpack-blocks)
* [Helpers](#helpers)
* [Shorthand setters](#shorthand-setters)
* [Third-party blocks](#third-party-blocks)
* [Design principles](#design-principles)
* [FAQ](#faq)
* [Like what you see?](#like-what-you-see)
* [License](#license)

<!-- tocstop -->
```

T> You can also use Markdown Magic to generate table of contents — see below.

### Including External Files

[Markdown Magic](https://github.com/DavidWells/markdown-magic) is a tool to include external files or any dynamic data.

Let’s install Markdown Magic:

```bash
npm install --save-dev markdown-magic
```

Add a new script to your _package.json_:

```json
"scripts": {
  "docs": "md-magic --path '**/*.md' --ignore 'node_modules'"
},
```

By default you can use one of these _transforms_:

* CODE — includes code from a file;
* REMOTE — content of a remote files;
* TOC — table of contents.

For example, to include code from a file:

```markdown
<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./relative/path/to/code.js) -->

This content will be dynamically replaced with code from the file

<!-- AUTO-GENERATED-CONTENT:END -->
```

And now run `npm run docs` every time you want to update your Markdown files.

You can create [your own transforms](https://github.com/DavidWells/markdown-magic#adding-custom-transforms) or use plugins:

* [github-contributors](https://github.com/DavidWells/markdown-magic-github-contributors) — GitHub contributors list;
* [install-command](https://github.com/camacho/markdown-magic-install-command) — install command with `peerDependencies` included;
* [subpackage-list](https://github.com/camacho/markdown-magic-subpackage-list) — list of all subpackages (great for projects that use Lerna);
* [package-scripts](https://github.com/camacho/markdown-magic-package-scripts) — a table of _package.json_ scripts with descriptions.

### Other Tools

* [projectz](https://github.com/bevry/projectz) — generates everything using data from _package.json_.
* [Mrm](https://github.com/sapegin/mrm) — generates basic README and updates README as part of other task.

## Testing Examples

Generating documentation from source code helps to make sure your examples are correct, testing code snippets in Markdown files is another option. [markdown-doctest](https://www.npmjs.com/package/markdown-doctest) tries to run every JavaScript code snippet in your documentation and report errors.

Let’s install markdown-doctest:

```bash
npm install --save-dev markdown-doctest
```

Add a new script to your _package.json_:

```json
"scripts": {
  "test:docs": "markdown-doctest"
},
```

Create a config file, _.markdown-doctest-setup.js_:

```js
module.exports = {
  // Define all global variables you use in code examples,
  // including standard Node or browser APIs
  globals: {
    module: {
      exports: {},
    },
    alert: () => {},
    foo: () => {},
  },
  // Define all dependencies: anything that your code examples
  // will `require`
  require: {
    assert: require('assert'),
    fs: require('fs'),
    './add': (a, b) => a + b,
  },
};
```

And finally run:

```bash
npm run test:docs
```

If something is wrong, you’ll see an error like this:

```bash
Failed - manuscript/appendices/02-customizing-eslint.md:42:1
evalmachine.<anonymous>:4
alert('foo'); // eslint-disable-line no-alert
^

ReferenceError: alert is not defined

You can declare alert in the globals section in .markdown-doctest-setup.js

For example:
// .markdown-doctest-setup.js
module.exports = {
  globals: {
    alert: ...
  }
}
```

T> To skip a code snippet, add a `<!-- skip-example -->` comment before it.

## Conclusion

README is one of the most essential parts of your projects. Potential users should find answers to all questions they may have when they are evaluating your package, and existing users should quickly find necessary documentation.
