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

JavaScript doesn’t have an official coding style but the community maintains a few. [Airbnb](https://github.com/airbnb/javascript) and [Standard](http://standardjs.com/) are especially popular: Airbnb is detailed and pragmatic, Standard is a bit controversial because it doesn’t use semicolons. [Semistandard](https://www.npmjs.com/package/semistandard) is a variant that fixes that issue. All of these options use two spaces for indentation.

ESLint is unopinionated and doesn’t have any rules by default so you should enable them manually or use a configuration like [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base), that implements Airbnb style guide. To get started, use `eslint --init` and let it generate a starting point for you.

All ES6 features are supported and [babel-eslint](https://www.npmjs.com/package/babel-eslint) adds support for newer ECMAScript features and Flow. ESLint is supported by JetBrains’ IDEs and is available as a plugin for other popular editors.

ESLint itself is modular and uses plugins to operate - for example:

* [eslint-plugin-compat](https://www.npmjs.com/package/eslint-plugin-compat) checks browser compatibility using [Browserslist](https://github.com/ai/browserslist), [Can I use](http://caniuse.com/) and [@kangax’s compat](http://kangax.github.io/compat-table/es6/) table.
* [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) validates ES6 import/export syntax, prevents misspelling of file paths.
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) contains best practices for React, JSX code style.
* [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security) finds potential security issues in Node code.

### Setting Up ESLint

Let’s install ESLint with the Airbnb config:

```bash
npm install eslint eslint-config-airbnb-base eslint-plugin-import --save-dev
```

Update your *package.json* as follows to run ESLint against the project. The setup will fix any errors it's able to fix thanks to the `--fix` flag:

```json
{
  "scripts": {
    "lint:js": "eslint . --fix"
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

**.eslintrc**

```json
{
  "extends": "airbnb-base",
  "parserOptions": {
    // ECMAScript version: 3—8 (or 2015—2017), defaults to 5
    "ecmaVersion": 6,

    // Treat source files as ECMAScript modules, defaults to "script"
    "sourceType": "module",
    "ecmaFeatures": {
      // Enable JSX
      "jsx": true,

      // Enable object rest/spread properties: {...a, ...b}
      "experimentalObjectRestSpread": true
    }
  },

  // If you’re using Flow or experimental ECMAScript features
  // not supported by ESLint, enable babel-eslint parser
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

See [ESLint docs on configuring](http://eslint.org/docs/user-guide/configuring) for more information.

T> *.eslintrc* supports [JSON5](http://json5.org/) format by default. It's a proposed extension to JSON that enables features like commenting and trailing commas.

T> ESLint configuration can be written in other formats, such as YAML or JavaScript, as well. JSON5 is a good default, though, given it's a good format for other tools to consume.

T> To get most value out of linting tools during development, make sure you have installed related editor plugins. This way you can get feedback realtime as you develop and can spot potential issues earlier.

### Speeding Up ESLint Execution

One of the most convenient ways to speed up ESLint execution on big projects is to run it on only files that have been changed while you are working. It's possible to achieve this by using *lint-staged*. The exact technique is covered in the *Automation* chapter.

Node comes with startup overhead and it takes a while for the processing to begin. [eslint_d](https://www.npmjs.com/package/eslint_d) is a daemon process designed to overcome this problem. It runs ESLint as a process in the background. [esprint](https://www.npmjs.com/package/esprint) is a similar solution. It runs ESLint across multiple threads parallel.

T> You can find [more technical details about esprint in its introduction post](https://medium.com/@Pinterest_Engineering/introducing-esprint-a-fast-open-source-eslint-cli-19a470cd1c7d).

## Linting TypeScript with TSLint

[TSLint](https://palantir.github.io/tslint/) is a linter for TypeScript. It has a much smaller community than ESLint and overall experience is not as nice but otherwise it’s like ESLint.

T> [TypeScript support](https://github.com/eslint/typescript-eslint-parser) for ESLint is experimental and has known issues.

### Setting Up TSLint

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

### Setting Up Stylelint

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

## Conclusion

Code style is an important aspect of code quality and you can enforce code style through tooling. Doing so forces contributors to code using the same standard and this also keeps the source consistent to read. Pushing code style to configuration also avoids arguments about which conventions to apply.

You'll learn about formatting in the next chapter.

T> See the *Automation* chapter to learn how to automate linting.
