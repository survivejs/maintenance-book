# Linting

Ideally code in a project should look like it was written by a single developer. It makes code reading simpler because you know how things are done and how they look in a project. You can force certain code style through linting. Linting can also capture mistakes related to the usage of the language.

## Why to Lint

Good code style can save you from a bug one day. Consider this code:

```js
if (mealType === BREAKFAST)
  drinkCoffee();
  eatCroissant();
```

Can you see the issue? `eatCroissant();` gets evaluated always.

Many popular JavaScript code styles require curly braces around all blocks and consistent indentation for this reason. Doing this forces you to write the correct code:

```js
if (mealType === BREAKFAST) {
  drinkCoffee();
  eatCroissant();
}
```

You can enforce code style through specific tools. Certain tools operate on language level while others go beyond that and allow you to operate per format. The tools can be used together for the best effect.

## EditorConfig

[EditorConfig](http://editorconfig.org/) allows you to define indentation style and other whitespace settings for any file type. This way your editor can automatically choose the correct settings. The biggest advantage of doing this is that it allows cross-platform issues as different platforms use varying line endings.

Here is a typical config (*.editorconfig*) with separate rules for Markdown, JSON and YAML files:

```ini
root = true

[*]
indent_style = tab
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{json,yml,md}]
indent_style = space
indent_size = 2
```

EditorConfig is supported by popular IDEs and editors through [specific plugins](http://editorconfig.org/#download). Once the plugin has been installed, you won't even notice it's there.

T> It's possible to force line endings through *.gitattributes* by setting `* text=auto` and `bin/* eol=lf`. You can still have EditorConfig in place regardless of how Git has been set up.

## Linting JavaScript Through ESLint

ESLint is a popular linter for JavaScript. It's primarily used to capture language related issues but can be used to enforce code style as well. It's possible to apply ESLint autofix against most of the rules making it fast to perform style related fixes.

JavaScript doesn't have an official coding style but the community maintains a few. Especially [Standard](http://standardjs.com/) and [Airbnb](https://github.com/airbnb/javascript) are popular. You can consume Airbnb style through [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb).

AirBnb is detailed and pragmatic, Standard is a bit controversial because it doesn’t use semicolons. Both use two spaces for indentation.

T> You can enable autofixing via git `precommit` hook with *lint-staged*.

## lint-staged

TODO

### Prettier

[Prettier](https://github.com/prettier/prettier) is an opinionated JavaScript formatter. It has a limited number of settings and most of the code style rules are built in. Prettier removes any existing formatting from your code and prints its own version which makes code absolutely consistent.

Prettier is smarter than other tools. For example you can restrict line length but tools like ESLint can only yell at you it a line is too long — you’d have to reformat code yourself. Prettier can reformat a line of code according to its length as below:

```js
foo(wowJavaScript(), suchFunction(), muchParameters(), soLong(), shouldReformat());
// →
foo(
  wowJavaScript(),
  suchFunction(),
  muchParameters(),
  soLong(),
  shouldReformat()
);
```

However, shorter statement would be printed as one line:

```js
foo(coffee, croissant, toast, eggs);
```

T> Try Prettier in [an interactive playground](https://prettier.github.io/prettier/).

This approach has many benefits:

* minimal configuration;
* almost no decisions to make;
* no arguing about particular rules if you’re working in a team;
* no need to learn you project’s code style for contributors;
* no need to fix style issues reported by ESLint.

Let’s install Prettier:

```bash
npm install --save-dev prettier
```

Add a script to your `package.json` like this:

```json
{
    "prettier": "prettier --print-width 120 --single-quote --trailing-comma es5 --write 'src/**/*.js'"
}
```

And finally run:

```bash
npm run prettier
```

W> Commit your code before running this command — it will reformat all your JavaScript files.

Prettier doesn’t support any config files and has few [command line keys](https://github.com/prettier/prettier#api) to modify its behavior. For example it doesn’t support tab indentation, only spaces.

It’s a good idea to disable code style rules in your ESLint config and let Prettier to deal with code style. For example, if you’re using [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb), you can replace it with [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier).

And to make your contributors’s life easier you can set up Prettier to format code before each commit with lint-staged. Update your lint-staged config (`.lintstagedrc`):

```json
{
  "*.js": [
      "eslint --fix",
      "prettier --print-width 120 --single-quote --trailing-comma es5 --write",
      "git add"
    ]
}
```

## Stylelint and stylefmt

[Stylelint](https://www.npmjs.com/package/stylelint) is a CSS specific linting tool. The idea is similar as for ESLint but this time the focus is on CSS.

[stylefmt](https://www.npmjs.com/package/stylefmt) complements the tool by providing automatic formatting for CSS. You can see it analogous to ESLint's autofix feature.

## Textlint and Proselint

TODO

## Conclusion

Code style is an important part of code quality. You can enforce code style through tooling. Doing this forces contributors to code using the same standard and this also keeps the source consistent to read. Pushing code style to configuration also avoids arguments about which conventions to apply.

You'll learn about testing in the next chapter.
