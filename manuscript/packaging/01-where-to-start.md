# Where to Start Packaging

npm has become wildly popular for managing JavaScript packages. It started in the backend world but has since grown to include frontend libraries as well. Perhaps one of the reason for the proliferation of packages is that it can be difficult to find exactly the package you need, so you end up making your own.

This situation is somewhat alleviated by the arrival of [npms](https://npms.io/) and similar solutions, but it still exists. One problem with developing your own package is that then you have something to maintain. Unless it's your core business or something you like to do, this can become a problem.

![Module counts in package managers based on modulecounts.com](images/module-counts.png)

## To Consume Packages or to Develop Them

The point of a package manager like npm is to avoid unnecessary development effort. Instead of developing every piece of code yourself, you consume ready-made functionality using npm. This isn't without its problems as you have to research and test your options.

npm ecosystem is vast and it hosts multiple smaller communities, such as AngularJS, Ember, or React. Certain utility libraries, like lodash, are valuable across these boundaries. npm offers a lot of choice and it's not uncommon to have tens of options available to address your specific problem.

When you are confronted with a technical problem, you have at least the following options:

1. Use an existing package.
2. Enhance an existing package.
3. Take over an existing package.
4. Fork an existing package.
5. Develop your own package.

## Use an Existing Package

If you get lucky, maybe there's a package that addresses your problem exactly. Then the problem is more about finding it and verifying the problem is solved adequately. To do this, you may want to walk through the project code, check out its issue tracker, and see if the project is in a vital state.

A lot depends on the scope and the focus of the project. Bigger projects tend to have more issues while they can still solve a series of important problems.

There are several pros and cons to this approach:

**Pros:**

* You can avoid potentially a lot of work.
* You don't re-invent the wheel.

**Cons:**

* There may be work hidden as the implementation may have bugs.
* You have to keep up with the package updates to gain improvements and fixes.

T> Services like [npm trends](http://www.npmtrends.com/) and [npm-stat](https://npm-stat.com/) can help you to evaluate the popularity of given packages during your research process.

## Enhance an Existing Package

It's possible you found something that almost fits. Perhaps there's small piece of functionality missing. Sometimes this can be an oversight in design as the use case you have in mind never came up.

Although there is some development cost involved, contributing the missing functionality back to the project is a viable option. This is particularly true if the project is in a healthy state and there's activity and a good chance that the work gets merged.

Before contributing, you should discuss the design with the project owners. Normally this is done by opening an issue at the project issue tracker, explaining the use case, and the desired solution. This may lead to further insights and avoid redundant effort as you spend time on design.

If everything goes fine, then the new functionality becomes a part of the official distribution and you essentially offload the maintenance effort to the project. You may still remain involved to support the project development to keep it in a good state of course.

The pros and cons are similar as before but there are a few more:

**Pros:**

* The community benefits from your enhancements.

**Cons:**

* You have to contribute the enhancements you need and take care to get them merged to the package.

## Take Over an Existing Package

Sometimes the process doesn't work ideally. Perhaps the project you want to contribute to has been abandoned by its authors or they are too busy to maintain it actively.

If you see value in the project and want to take over the maintenance, get in touch with the authors. You might be able to negotiate a good solution. Perhaps they would like to continue to work under some conditions. Contracting is an option.

It's important to consider the project rights. This becomes important if you want to go into a more commercial direction with it and for example **dual license** it. In that case you would sell a specific version for commercial usage while also maintaining a version free for the community at large.

This time pros and cons are more involved as you become more active.

**Pros:**

* You have control over the direction of the codebase.
* The code stays maintained as long as you are willing to put effort to it.

**Cons:**

* You gain new responsibilities depending on how you do this. A package may come with a user community you may want to nourish.

## Fork an Existing Package

You can also fork the project. This can be done in a few ways. You could maintain a private fork that's used only by your projects. In npm terms this could be achieved using **scoping** and you could end up with `@organization/some-package` that contains the modified version. In this case the maintenance cost is higher as you assume the responsibility for further development.

Another option would be to rename the project while retaining references to the original project to comply with common licensing clauses (esp. MIT) and then publish it publicly under a new name.

Depending on what you are doing, original licensing can become problematic. This applies particularly to so called copyleft (or viral) licenses which include GPL and AGPL (a stricter variant), which put restrictions on the usage. If you fork a project like this, note that the license still applies!

Over time the original project might become active again and you could look into merging the efforts. This has happened in the past with bigger projects like Node and io.js or ayo. A fork can revitalize a stagnant project and force it to pick up pace again.

This time around you gain control but also split effort.

**Pros:**

* You have control over your fork and may take it to a direction you want.
* You avoid politics related to project control.

**Cons:**

* Potential duplication of work.
* Potential confusion in the user community.

T> Learn different licensing options by reading [The Legal Side of Open Source](https://opensource.guide/legal/), [Open-Source Licensing For Dummies](http://www.binpress.com/blog/2013/06/21/open-source-licensing-for-dummies/) and [Producing OSS: Legal Matters chapter](http://producingoss.com/en/legal.html).

## Develop Your Own Package

If there's nothing that fits your purposes or you want to develop a solution of your own, that's certainly possible. Sometimes people end up developing a solution of their own because they aren't aware of the existing options. Discoverability is a real problem given the amount of packages available.

One of early stage problems is figuring out a good name for a package. npm root namespace has become crowded and it can be difficult to find a free name. Also, you may have to worry about existing trademarks to avoid problems later on. By skipping this you may have to rename your package later as happened for [Jade which had to rename as Pug](https://github.com/pugjs/pug/issues/2184).

[Scoped packages](https://docs.npmjs.com/misc/scope) could solve the naming issue. A scoped package name looks like `@scope/name` and allows you to group a series of packages behind a name space. Scoping allows you to manage people that have access to these packages easily. Scopes are freely available for open source projects.

[DefinitelyTyped](https://www.npmjs.com/search?q=scope:types&page=1&ranking=optimal) and [webpack-blocks](https://www.npmjs.com/search?q=scope:webpack-blocks&page=1&ranking=optimal) are examples of projects using scoped packages.

This is the most expensive option as in this case you assume most of the development cost. You will also have to deal with maintenance and possible community support if the package becomes popular.

The pros and cons are roughly opposite compared to using an existing package:

**Pros:**

* You get exactly the solution you are capable of developing.
* You control package releases and can publish fixes and features as you prefer.

**Cons:**

* You may re-invent the wheel.
* You may have to work a lot.

## Consumption Workflow

Often npm consumption workflow resolves around two commands:

* `npm install <package> --save` or `npm i <package> -S`.
* `npm install <package> --save-dev` or `npm i <package> -D`

To install a specific version, you should pass it through `@<version>`. npm will set the version prefix based on *~/.npmrc*. The related ranges are discussed later in this chapter.

You can refer to a package by its name and version but that is not the only way. Consider the following alternatives:

* `<git repository>#<reference>` points to a Git repository and a Git reference.
* `<github user>/<project>#<reference>` shortcut points to GitHub in a similar manner.
* `<github user>/<project>#pull/<id>/head` points to a specific GitHub pull request.

`<reference>` can be either commit hash, tag, or a branch. The technique does not work unless the package has been set up to support consumption outside of Git. The *Package Authoring Techniques* chapter shows how to achieve this.

T> To avoid sharing all your packages in public, npm allows you to maintain private packages through their commercial offering. Another option is to use a package like [verdaccio](https://www.npmjs.com/package/verdaccio). verdaccio allows you to maintain a private server that can also work as a cache for npm. You can also override public packages using it.

## Conclusion

Before writing a package of your own, investigate existing packages. You may find that a new package is not required after all or that you can contribute to a thriving one. Even forking an old package and revitalizing the effort can be a good option that allows you to save the pain of re-inventing the wheel.

You'll learn how npm packages are structured in the next chapter.
