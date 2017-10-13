# Automation

Everything that can be done by a machine, will eventually be done by a machine. One of the earliest "computers", [the Jacquard machine](https://en.wikipedia.org/wiki/Jacquard_loom), achieved this for manufacturing complex textiles. It displaced human effort this way and pushed the difficult and monotonous task to a machine. This is the whole point of automation.

The same idea applies to software projects. Why to repeatedly do something that you can have the machine do for you? Or why to do something the hard way when it's possible to do it in an easier way while having the machine to assist you?

## Git Commit Messages

Depending on the developer and the development style, the quality of Git commit messages can vary. It's important data given it may be used in the future as you have to figure out why some code was written the way it was. The quality of commit messages becomes particularly important when more people get involved with the project.

### Commit Message Conventions

Especially [AngularJS commit message convention](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y) has gained popularity in the JavaScript community. The ideas have been formalized in [the Conventional Commits specification](https://conventionalcommits.org/).

The idea is to provide context to a commit. This enables effective filtering of Git log and it keeps the log tidy. Given the convention is standard, it has lead to tooling that can for example generate change logs for releases or even handle whole release process for you.

To make it easier to follow the aforementioned conventions, [commitizen](https://www.npmjs.com/package/commitizen) gives a specific command, `git cz`. It asks you a series of questions and then fills the message with the correct information. This way you don't have to remember the specification in detail and you will gradually learn it.

T> Internally commitizen relies upon [commitlint](https://github.com/marionebl/commitlint). commitlint provides a tool you can use to validate messages. commitizen wraps it in a higher level interface.

### AngularJS Commit Message Convention

In AngularJS convention each commit message consists of:

* Type: `feat` for a new feature, `fix` for a bug fix, `docs` for documentation, `chore` for maintenance, etc.
* Subject: short change description.
* Body (optional): long change description.
* Footer (optional): breaking changes, GitHub issues references, etc.

For example:

```
feat($compile): simplify isolate scope bindings

Changed the isolate scope binding options to:
  - @attr - attribute binding (including interpolation)
  - =model - by-directional model binding
  - &expr - expression execution binding

This change simplifies the terminology as well as
number of choices available to the developer. It
also supports local name aliasing from the parent.

BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
  myBind: 'bind',
  myExpression: 'expression',
  myEval: 'evaluate',
  myAccessor: 'accessor'
}

After:

scope: {
  myAttr: '@',
  myBind: '@',
  myExpression: '&',
  // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
  myAccessor: '=' // in directive's template change myAccessor() to myAccessor
}
```

Messages can be descriptive like this when they capture a big change. During development smaller messages representing meaningful changes are enough. Messages as the one above can be written as the work gets merged to the release branch of the project.

The advantage of doing this is that it makes it easier for other developers to tell what's going on. Some of the information can be reused for documentation purposes in project main documentation and change logs.

T> It's a common convention to write commit titles in **imperative** tense. The main reason is that this keeps the results of `git diff` more understandable to other developers. [Chris Beams explains the message idea in detail in his blog](https://chris.beams.io/posts/git-commit/).

## Semantic Release

By default semantic-release makes everything automatically:

* Runs on a CI server after each commit to the `master` branch.
* After each successful build it analyzes new commits and see if there’s something to publish.
* Determines a release type (PATCH, MINOR or MAJOR) by analyzing commit messages written using AngularJS conventions.
* Generates a change log from important commits (skips documentation and maintenance commits).
* Publishes a new package version to npm.
* Publishes change log to GitHub Releases page.

To use semantic-release you need to install its command line tool:

```bash
npm install -g semantic-release-cli
```

Then run it in your project folder:

```bash
semantic-release-cli setup
```

Enter your npm and GitHub credentials, choose type of your CI server.

And now if you make a new commit with a message like `fix: allow doodad to work with zero`, semantic-release will publish a new PATCH version to npm and publish release notes based on the commit message to GitHub.

T> You can customize every step of this process with plugins. For example, [make only PATCH releases automatically](http://blog.sapegin.me/all/semantic-release) and allow user to decide when to make MINOR and MAJOR releases and edit change logs manually.

T> Look into [standard-release](https://www.npmjs.com/package/standard-version) and [unleash](https://www.npmjs.com/package/unleash) for alternatives.

## Git Hooks

Git provides a set of hooks that trigger for example before pushing or committing a change. These hooks are ideal for quick checks and they allow you to adjust your source before finally pushing by using `git rebase --interactive` (or `git rebase -i`). Rebase workflow is good to know as it allows you to fix mistakes before they get shared with other developers.

Git hooks can be used in a JavaScript project with a package such as [husky](https://www.npmjs.com/package/husky). It connects Git hook interface with npm `scripts`. Consider the example below:

**package.json**

```json
"scripts": {
  ...
  "prepush": "npm test"
},
```

The package will do all the wiring required and run project tests before pushing to the repository.

T> Note that if you have set up Git hooks manually, it might not work! It's better to let husky control the Git side entirely.

## Automating Linting with lint-staged

[lint-staged](https://github.com/okonet/lint-staged) runs linters only for changed files before each commit which makes linting mandatory and fast. It uses `pre-commit` Git hook and you can map any file extension to a shell command. You can also configure it to autofix code.

T> lint-staged works with [Flow since v0.48.0](https://github.com/facebook/flow/releases/tag/v0.48.0).

W> You still need to run linters on your CI server: it’s possible to avoid the `pre-commit` hook with `git commit --no-verify` in the GitHub UI.

### Setting Up lint-staged

Let’s install lint-staged and [husky](https://www.npmjs.com/package/husky) to manage Git hooks:

```bash
npm install lint-staged husky --save-dev
```

Update your *package.json* like this:

**package.json**

```json
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "jest --bail --findRelatedTests",
      "prettier --write",
      "git add"
    ],
    "*.scss": [
      "stylefmt",
      "stylelint --syntax scss",
      "git add"
    ]
  }
}
```

This configuration will perform the following steps:

* Every time you commit a *.js* file:

  1. Run ESLint with autofixing on files you are committing.
  2. Run Jest tests related to files you are committing.
  3. Format files you are committing with Prettier. (See the *Code Formatting* chapter for more details.)
  4. Add changes caused by autofixing and reformatting to your commit.

* Every time you commit an *.scss* file:

  1. Format files you are committing with stylefmt.
  2. Run stylelint on files you are committing.
  3. Add changes caused by reformatting to your commit.

## Automating Releases

To make it easier to comply with SemVer, [next-ver](https://www.npmjs.com/package/next-ver) can compute the next version you should use and update it for you. [commitizen](https://www.npmjs.com/package/commitizen) goes further and allows change log generation and automated releases. [semantic-release](https://www.npmjs.com/package/semantic-release) allows you to automatically make new npm releases and publish release notes to GitHub.

All these tools rely on commit message convention.

## gh-lint

https://www.npmjs.com/package/gh-lint

## Danger

TODO

* What problems does Danger solve

## Bots

TODO

* https://github.com/babel/babel-bot
* https://github.com/open-bot/open-bot
* https://github.com/probot/probot
* What problems bots solve

## Conclusion

TODO
