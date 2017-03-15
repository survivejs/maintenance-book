# Code style

## Importance of Code Style

Ideally code in a project should look like it was written by a single developer. It makes code reading simpler because you know how things are done and how they look in a project. And you know how you should write your own code.

Code style is also the most subjective thing and developers spend too much time arguing on code style when in most cases particular style doesn’t matter. What matters is code style consistency across the project.

However a good code style my save you from a bug one day. Consider this code:

```js
if(mealType===BREAKFAST)
    drinkCofee();
    eatCroissant();
```

Can you see a bug here?

Many popular JavaScript code styles require curly braces around all blocks and consistent indentation so you’d write correct code:

```js
if (mealType === BREAKFAST) {
    drinkCofee();
    eatCroissant();
}
```

Consistent code style is especially important for open source projects with many casual contributors — they’re not likely to study your project’s code style.

Automated code style validation or code auto formatting may save you a lot of time and nerves.

### EditorConfig

[EditorConfig](http://editorconfig.org/) allows you to define indentation style and other whitespace settings for any file type, so your editor could automatically choose correct settings.

Here is a typical config (`.editorconfig`) with separate rules for Markdown, JSON and YAML files:

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

JetBrains IDEs support EditorConfig by default and [there are plugins](http://editorconfig.org/#download) for other popular editors.

### Using ESLint to Maintain JavaScript Code Style

ESLint has many rules to check your JavaScript code styles and you can make it truly picky. Luckily many of this rules are auto fixable otherwise it would make life of your contributors harder.

Unfortunately JavaScript has no idiomatic code style and many projects have unique code style or no code style at all. But there are two popular code styles:

* [AirBnb](https://github.com/airbnb/javascript)
* [Standard](http://standardjs.com/)

AirBnb is detailed and pragmatic, Standard is a bit controversial because it doesn’t use semicolons. Both use two spaces for indentation.

Choose one of he most popular ESLint presets to make your project’s code style familiar to as many contributors as possible. [AirBnb](https://github.com/airbnb/javascript) or
[Standard](http://standardjs.com/) are good choices.

T> See ESLint chapter to learn how to configure ESLint.

T> You can enable auto fixing via git `precommit` hook with lint-staged.

### Stylelint and stylefmt

TODO

### Prettier

[Prettier](https://github.com/prettier/prettier) is an opinionated JavaScript formatter. It has a limited number of settings and most of the code style rules are built in. Prettier removes any existing formatting from your code and prints its own version which makes code absolutely consistent.

Prettier is smarter than other tools. For example you can restrict line length but tools like ESLint can only yell at you it a line is too long — you’d have to reformat code yourself. Prettier can reformat a line of code according to its length:

```js
foo(wowJavaScript(), suchFunction(), muchParameters(), soLong(), shuldReformat());
// →
foo(
  wowJavaScript(),
  suchFunction(),
  muchParameters(),
  soLong(),
  shuldReformat()
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
* no need to learn you project’s code style for contributors.

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

## Conclusion

TODO
