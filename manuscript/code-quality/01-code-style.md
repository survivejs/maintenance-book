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

Consistent code style is especially important for open source projects with many casual contributions — developers won’t study your project’s code style when they contribute for the first time.

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

TODO

## Conclusion

TODO
