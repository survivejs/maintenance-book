# Managing Packages Using a Monorepo

npm packages can be managed in multiple ways. Perhaps the most common way is to have one package per a source repository. The problems begin when you have to orchestrate changes across multiple related packages. The idea of **monorepos** was designed for this purpose.

## Monorepos - What Are They

A monorepo allows you to maintain multiple related packages within a single repository. Bigger projects, such as Babel or Jest, use this method for organizing their work. They use [Lerna](https://lernajs.io/), a tool designed to help maintaining monorepos. The tooling can figure out what packages to update based on changes and help with the versioning problem.

Lerna itself is quite opinionated and can be replaced with a package like [mondorepo](https://www.npmjs.com/package/mondorepo), [oao](https://www.npmjs.com/package/oao), or custom scripts as [Cycle.js](https://github.com/cyclejs/cyclejs) has done.

Regardless of the technical solution, the idea is always similar. Your packages will exist with a predefined directory and you can maintain other directories for higher level documentation, examples, and project site next to it. You can also bring package README files as a part of the site to avoid redundancy and to keep the quality of them high.

To give you an idea of a monorepo, consider the following structure from Reactabular, a project of mine:

```bash
.
├── CHANGELOG.md
├── CNAME
├── CONTRIBUTING.md
├── CONTRIBUTORS.md
├── LICENSE.md
├── README.md
├── coverage
│   ├── ...
│   └── lcov.info
├── docs
│   ├── ...
│   ├── index.jsx
│   ├── ...
│   └── table
├── favicon.ico
├── gh-pages
│   ├── ...
│   ├── index.html
│   └── js
├── images
│   ├── ...
│   └── survivejs.png
├── lerna.json
├── lib
│   ├── post_install.js
│   └── test_setup.js
├── node_modules
│   ├── ...
│   └── yargs-parser
├── package.json
├── packages
│   ├── reactabular-dnd
│   ├── reactabular-resizable
│   ├── reactabular-sticky
│   ├── reactabular-table
│   └── reactabular-virtualized
├── style.css
├── templates
│   └── index.ejs
└── webpack.config.babel.js
```

In practice there are more files and you can find more packages within the organization. I decided to push the core packages within this monorepo while I maintain secondary functionality not related strictly to it outside of the repository. A mixed model like this is one option.

## Managing Separate Repositories

Webpack is a popular project bundler. Managing the project comes with its own challenges. The project does **not** use a monorepo model. Instead, it has opted for organization based approach. It has two main organizations. One of for the core and one for [webpack-contrib](https://github.com/webpack-contrib). Latter organization contains packages that complement the core.

Separating each package to a repository of its own makes them snowflakes in sense that each repository easily becomes different and it's hard to keep them in sync if infrastructure evolves somehow. To solve the problem, [webpack-defaults](https://www.npmjs.com/package/webpack-defaults) was developed.

The idea was to push project configuration (GitHub templates, linting, testing setup, i.e.) to a single package that could be consumed across webpack-contrib repositories. When you install *webpack-defaults* to your project, it writes a `webpack-defaults` npm script entry you can run. After you perform `npm run webpack-defaults`, it pulls project defaults from the package and migrates the project as well it can to follow the standard.

Sometimes this can mean replacing entire file (i.e. Travis configuration) but there are times when patching the existing configuration is enough. This allows you to retain control and it avoids customization per project based on specific needs.

The biggest win of pushing shared configuration to a package like this is that it allows webpack to push project standards to a single place where they can be maintained. The changes can be consumed by running a single command at each project. This still requires inspection by programmers but it beats the alternative where it's not possible to cascade changes across projects.

*webpack-defaults* relies on [mrm-core](https://www.npmjs.com/package/mrm-core) for handling project level migrations. It's at its best in patching configuration file formats like JSON or YAML. The problems begin if you have to patch configuration based on JavaScript as then the needed transformations become arbitrary given code can be written in so many ways. This is where [codemods](https://www.npmjs.com/package/js-codemod) can come in for limited scenarios.

## Conclusion

Monorepos provide a refreshing alternative to managing each package per repository. They allow you to share the same configuration across separate packages and also coordinate related changes more easily. The approach comes with technical cost as performing this orchestration requires tooling.

Another option is to push the configuration problem to a package as was done in *webpack-defaults*. This way you can manage shared standards in a single place and share them across multiple projects.
