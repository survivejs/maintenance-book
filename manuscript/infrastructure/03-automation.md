# Automation

When to apply automation. pros/cons

## Git Hooks

TODO: Mention commit hooks that can check things like commit message syntax and run tests. This allows rebase workflow.

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

## Commit Message Convention

Commit message conventions lets the tooling to figure out types of the changes you made. It can help with change log generation and allow automated releases over manual ones. Annotating your commits well is a good practice in any case as it makes it easier to debug your code later.

You can invent your own convention or adopt a popular one like AngularJS.

In [AngularJS convention](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) each commit message consists of:

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

?> I think it's worth pushing the present imperative tense for commit messages. Here's a good article on this topic: https://chris.beams.io/posts/git-commit/ Thus we describe what a commit will *do*, if applied.

TODO: https://www.npmjs.com/package/gh-lint
TODO: https://www.slideshare.net/epoberezkin/auditing-development-guidelines-in-github-repositories

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
