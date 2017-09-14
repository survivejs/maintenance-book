# Linting

We read code more often then we write it: sometimes we spend hours looking for what caused the bug, only to fix it with a single line of code. That’s why consistent code style is important. Ideally code in a project should look like it was written by a single developer. It makes code easier to read because the same formatting patterns are used everywhere in the project.

## Why to Lint

Good code style can save you from a bug one day. Consider this code:

<!-- textlint-disable -->

```js
if (mealType === BREAKFAST)
  drinkCoffee();
  eatCroissant();
```

<!-- textlint-enable -->

Can you spot the issue? `eatCroissant();` gets evaluated with *any* `mealType` value.

Many popular JavaScript code styles require curly braces around all blocks and consistent indentation for this reason. Doing this forces you to write the correct code:

```js
if (mealType === BREAKFAST) {
  drinkCoffee();
  eatCroissant();
}
```

You can enforce code style in your project or even autoformat code with linters and code formatting tools. Linting can also capture mistakes in your code before you even run it — thanks to IDE and editor integration.

Code style is subjective and automation can reduce pointless discussions and improve team productivity. It also simplifies switching between different projects and reduces time to ramp up on a new project.

## Linting JavaScript with ESLint

[ESLint](http://eslint.org/) is a popular linter for JavaScript. It’s primarily used to capture language related issues but can be used to enforce code style and good practices. It can fix many issues automatically, especially code style. You can write your own rules to ensure code consistency across your team or organization.

JavaScript doesn’t have an official coding style but the community maintains a few. Especially [Airbnb](https://github.com/airbnb/javascript) and [Standard](http://standardjs.com/) are popular: Airbnb is detailed and pragmatic, Standard is a bit controversial because it doesn’t use semicolons. [Semistandard](https://www.npmjs.com/package/semistandard) is a variant that fixes that issue. All of these options use two spaces for indentation.

ESLint is unopinionated and doesn’t have any rules by default so you should enable them manually or use a config like [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base), that implements Airbnb style guide. To get started, use `eslint --init` and let it generate a starting point for you.

All ES6 features are supported and [babel-eslint](https://www.npmjs.com/package/babel-eslint) adds support for newer ECMAScript features and Flow. ESLint is supported by JetBrains’ IDEs and has plugins for other popular editors.

ESLint has many plugins, for example:

* [eslint-plugin-compat](https://www.npmjs.com/package/eslint-plugin-compat) — checks browser compatibility using *browserslist* file, [caniuse](http://caniuse.com/) and [@kangax’s compat](http://kangax.github.io/compat-table/es6/) table.
* [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) — validates ES6 import/export syntax, prevents misspelling of file paths.
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) — best practices for React, JSX code style.
* [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security) — finds potential security issues in Node code.

### Setting Up ESLint

Let’s install ESLint with the Airbnb config:

```bash
npm install eslint eslint-config-airbnb-base eslint-plugin-import --save-dev
```

Update your *package.json* like this:

```json
{
  "scripts": {
    "lint:js": "eslint . --cache --fix"
  }
}
```

Create a config file, *.eslintrc*:

```json
{
  "extends": "airbnb-base"
}
```

And finally run:

```bash
npm run lint:js
```

You may need to tweak your *.eslintrc* according to your project needs:

```json
{
  "extends": "airbnb-base",
  "parserOptions": {
    // ECMAScript version: 3—8 (or 2015—2017), default is 5
    "ecmaVersion": 6,
    // Treat source files as ECMAScript modules, default is "script"
    "sourceType": "module",
    "ecmaFeatures": {
      // Enable JSX
      "jsx": true,
      // Enable object rest/spread properties: {...a, ...b}
      "experimentalObjectRestSpread": true
    }
  },
  // If you’re using Flow or experimental ECMAScript features not supported by ESLint
  "parser": "babel-eslint",
  // Predefined sets of global variables
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  }
}
```

See [ESLint docs](http://eslint.org/docs/user-guide/configuring) for more information.

## Linting TypeScript with TSLint

[TSLint](https://palantir.github.io/tslint/) is a linter for TypeScript. It has a much smaller community than ESLint and overall experience is not as nice but otherwise it’s like ESLint.

T> [TypeScript support](https://github.com/eslint/typescript-eslint-parser) for ESLint is experimental and has issues.

### Setting up TSLint

Let’s install TSLint with the Airbnb config:

```bash
npm install tslint tslint-config-airbnb --save-dev
```

Update your *package.json* like this:

```json
{
  "scripts": {
    "lint:ts": "tslint --fix 'src/**/*.ts'"
  }
}
```

Create a config file, *tslint.json*:

```json
{
  "extends": "tslint-config-airbnb"
}
```

And finally run:

```bash
npm run lint:ts
```

## Linting CSS with Stylelint

[Stylelint](https://stylelint.io/) is a CSS linting tool, it’s like ESLint but for CSS. Stylelint understands CSS, including the latest features like custom properties, and SCSS. Sass-like indented syntaxes are supported using PostCSS [SugarSS](https://github.com/postcss/sugarss). It also has an experimental support for Less.

[stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard) is a config maintaned by stylelint team and based on CSS style guides of GitHub, Google and Airbnb.

### Setting up Stylelint

Let’s install stylelint:

```bash
npm install stylelint stylelint-config-standard --save-dev
```

Add a script to your *package.json* like this:

```json
{
  "scripts": {
    "lint:css": "stylelint --fix '**/*.scss' --syntax scss"
  }
}
```

Create a config file, *.stylelintrc*:

```json
{
  "extends": "stylelint-config-standard"
}
```

And finally run:

```bash
npm run lint:css
```

## Automating Linting with lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) runs linters only for changed files before each commit which makes linting mandatory and fast. It uses `pre-commit` Git hook and you can map any file extension to a shell command. You can also configure it to autofix code.

W> You still need to run linters on your CI server: it’s possible to avoid `pre-commit` hook with `git commit --no-verify` of using GitHub UI.

### Setting up lint-staged

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

This configuration will:

* Every time you commit a *.js* file:

  1. Run ESLint with autofixing on files you are committing.
  2. Run Jest tests related to files you are committing.
  3. Format files you are committing with Prettier. (See the next chapter for more details.)
  4. Add changes caused by autofixing and reformatting to your commit.

* Every time you commit an *.scss* file:

  1. Format files you are committing with stylefmt.
  2. Run stylelint on files you are committing.
  3. Add changes caused by reformatting to your commit.

## Conclusion

Code style is an important part of code quality. You can enforce code style through tooling. Doing this forces contributors to code using the same standard and this also keeps the source consistent to read. Pushing code style to configuration also avoids arguments about which conventions to apply.

You'll learn about formatting in the next chapter.
