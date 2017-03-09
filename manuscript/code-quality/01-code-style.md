# Code style

## Importance of Code Style

Ideally code in a project should look like it was written by a single developer. It makes code reading simpler because you know how things are done and how they look in a project. And you know how you should write your own code.

Code style is also very subjective thing and developers spend too much time arguing on code style when in most cases particular style doesn’t really matter. What matters is code style consistency across the project.

Automated code style validation or code auto formatting may save you a lot of time and nerves.

## Popular JavaScript Code Styles

Unfortunately JavaScript has no idiomatic code style and many projects have unique code style or no code style at all.

But there are two popular code styles:

* [AirBnb](https://github.com/airbnb/javascript)
* [Standard](http://standardjs.com/)

AirBnb is very detailed and pragmatic, Standard is a bit controversial because it doesn’t use semicolons. Both use two spaces for indentation.

If you choose one of them your project’s code style will be familiar for many developers.

### EditorConfig

[EditorConfig](http://editorconfig.org/) allows you to define indentation style and other whitespace settings for any file type, so your editor will automatically choose correct settings.

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

TODO: Plugins for editors

### Using ESLint to Maintain JavaScript Code Style

ESLint has many rules to check your JavaScript code styles and you can make your config very picky. Luckily many of this rules are auto fixable otherwise it would make life of your contributors really hard.

We recommend choosing one of he most popular ESLint presets to make your project’s code style familiar to as many contributors as possible. [AirBnb](https://github.com/airbnb/javascript) or
[Standard](http://standardjs.com/) are good choices.

T> See ESLint chapter to learn how to configure ESLint.

T> You can enable auto fixing via git precommit hook with lint-staged.

### Stylelint and stylefmt

TODO

### Prettier

TODO: Code style (EditorConfig, prettier)

## Conclusion

TODO
