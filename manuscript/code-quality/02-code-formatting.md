# Code Formatting

Usually linters can validate and fix code formatting but there are specialized tools that work better.

## Achieving Code Consistency

**Code consistency** helps when several people work on the same codebase:

* code look similar everywhere;
* programming patterns used consistently across the codebase;
* naming is consistent.

Code formatting tools solve the first problem. They also [solve another problem](https://medium.freecodecamp.org/why-robots-should-format-our-code-159fd06d17f7) — arguments on the right code style in a team.

Linters can help with the second problem, although they won’t solve it entirely. This like `var` v. `const` / `let` can be detected by ESLint, but higher level patterns can’t.

Problems like naming consistency are hard, or even impossible, to detect automatically. For example, you could have `FooLoader` and `BarThatLoadsFoo` that both do the same thing but in different ways. To detect such issues you’ll have to review all new code manually.

A common misconception is that if you use a code formatter like Prettier then you don’t need a linter anymore. There’s some overlap between two tools. ESLint can fix indentation, semicolons or quote type in JavaScript, but Prettier can achieve 100% code consistency, because it removes the original formatting and reprints all the code using its own formatting rules.

Most of the time you’ll benefit from using both tools at the same time: use ESLint to catch possible errors and achieve consistent language usage and Prettier to format the code.

## Configuring IDEs and Editors With EditorConfig

[EditorConfig](http://editorconfig.org/) allows you to define indentation style and other whitespace settings for any file type. This way your editor can automatically choose the correct settings. This is handy when developers use platforms with different line endings, e.g., Mac and Windows.

Here is a typical config (_.editorconfig_) with separate rules for Markdown, JSON and YAML files:

**.editorconfig**

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

EditorConfig is supported by popular IDEs and editors through [plugins](http://editorconfig.org/#download).

T> It's possible to force line endings through _.gitattributes_ by setting `* text=auto` and `bin/* eol=lf` but EditorConfig has more options.

T> [Use Mrm](https://github.com/sapegin/mrm-tasks/tree/master/packages/mrm-task-editorconfig) to add EditorConfig to your project with a single command.

## Formatting Code With Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter that supports JavaScript, TypeScript, CSS, GraphQL, JSON and Markdown. It has few settings and most of the code style rules are built in. Prettier removes any existing formatting from your code and prints its own version which makes code absolutely consistent.

Prettier is smarter than other tools. For example, you can restrict line length while tools like ESLint can only yell at you if a line is too long and you would have to reformat the code yourself. If any line exceeds the limit, Prettier reformats the whole code block:

<!-- prettier-ignore -->
```javascript
foo(wowJs(), suchFunction(), muchParameters(), shouldReformat());
```

After the code goes through Prettier, you'll end up with the code below:

<!-- prettier-ignore -->
```javascript
foo(
  wowJs(),
  suchFunction(),
  muchParameters(),
  shouldReformat()
);
```

However, shorter statement would be printed as one line:

<!-- prettier-ignore -->
```javascript
foo('coffee', 'croissant', 'toast', 'eggs');
```

T> Try Prettier in [an interactive playground](https://prettier.io/playground/).

{pagebreak}

This approach has many benefits:

* Minimal configuration.
* Almost no decisions to make.
* No arguing about particular rules if you’re working in a team.
* No need to learn you project’s code style for contributors.
* No need to fix style issues reported by ESLint.

Prettier has few [options](https://prettier.io/docs/en/options.html) to modify its behavior, like indentation, quotes and semicolons.

W> You’ll need to disable code style rules in your ESLint config, otherwise they will conflict with Prettier. For example, you can use [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) instead of [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base). [eslint:recommended](https://eslint.org/docs/rules/) will work fine because it has no code style rules.

T> To make your contributors’ life easier you can set up Prettier to format code before each commit with lint-staged — see the _Automation_ chapter.

{pagebreak}

### Setting up Prettier

Let’s install Prettier:

```bash
npm install prettier --save-dev
```

W> Prettier team recommends pinning an exact version of Prettier in your _package.json_ as they may introduce stylistic changes in patch releases.

Add a script to your _package.json_ like this:

**package.json**

```json
{
  "scripts": {
    "format": "prettier --write '**/*.{js,css,md}'"
  }
}
```

Create a config file, _.prettierrc_:

**.prettierrc**

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

And finally run:

```bash
npm run format
```

W> Commit your code before running Prettier for the first time — it will reformat all your codebase.

T> Prettier will ignore `node_modules` by default, use _.prettierignore_ file to ignore other files.

T> [Use Mrm](https://github.com/sapegin/mrm-tasks/tree/master/packages/mrm-task-prettier) to add Prettier to your project with a single command.

### Setting up Prettier As ESLint Plugin

You can also run Prettier as a [ESLint plugin](https://github.com/prettier/eslint-plugin-prettier). This way Prettier formats all files that go through ESLint and you will not need to setup another script.

Let’s install Prettier and `eslint-plugin-prettier`, assuming you already have ESLint configured as described in the _Linting_ chapter:

```bash
npm install prettier eslint-plugin-prettier --save-dev
```

{pagebreak}

Update your _.eslintrc_ like this:

**.eslintrc**

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "es5"
      }
    ]
  }
}
```

T> You can also put your Prettier config into a _.prettierrc_ file, see an example above.

And finally run:

```bash
npm run lint:js
```

T> You can set up your editor to run `eslint --fix` on save and it will reformat your code every time you save a file.

W> If you have ESLint in your editor, you may notice that it reports too many issues while you’re writing code because of Prettier. To solve this issue you can disable `prettier/prettier` rule in your editor’s ESLint settings.

## Formatting CSS With Stylelint

Stylelint can format your CSS with `--fix` switch, check the _Linting_ chapter to know how to set it up.

## Conclusion

Formatting tools complement linting well. They eliminate one source of confusion and make sure your code is formatted in a consistent way.

You'll learn about typing in the next chapter.

T> See the _Automation_ chapter to learn how to automate code formatting.
