# Where to Start Packaging

npm has become wildly popular for managing JavaScript packages. It started from the backend world but has since grown to include frontend libraries as well. Perhaps one of the reason why so many npm packages exist is that it's difficult to find a package matching to your requirements.

The situation has become better thanks to development of [npms](https://npms.io/) and similar solutions but it still exists. The problem of developing your own solution is that then you have something to maintain. Unless it's your core business or something you like to do, this can become problematic.

![Module counts in package managers based on modulecounts.com](images/module-counts.png)

## To Consume Packages or to Develop Them

The point of a package manager like npm is to avoid unnecessary development effort. That said, sometimes re-inventing the wheel somehow is needed as everything needs to fit together. npm hosts whole ecosystems of packages that work together.

The world of JavaScript is increasingly fragmented although there are packages you can use regardless of certain higher level choices. Utility libraries are valuable regardless whether you are using Angular, Ember, or React.

You have at least the following options when you come upon a technical problem to solve:

1. **Use an existing package.** If it's missing functionality, develop the remainder. It can make sense to **contribute** the functionality back to the core project if it fits there. The model allows collaboration and reduces the maintenance cost as a result if the project owners can work with you. You can also fund their development efforts to help you directly.
2. **Fork an existing package** and maintain it on your own. It's possible to find a project that solves your problem but isn't under active maintenance effort. In this case it can make sense to fork the project and maintain it under a different name while respecting the copyright of the original one. Here maintenance cost is higher as you assume ownership of development.
3. **Develop your own package**. Developing a solution on your own is usually the most expensive option depending on the complexity of the problem.

## Using an Existing Package

It can be worthwhile to spend time researching the available options. If nothing else, this helps you to understand the solution space better. You will learn how people have tried to solve the problem. Doing this gives insight on how to solve it properly. In the ideal case you will find a package that solves your problem.

Only having a solid technical solution isn't enough. It's good to consider the overall quality of a package. You should understand how well the project is doing. Sometimes popular projects are overwhelmed by their user base and have poor support as a result. You can also find lesser known projects that work well but are missing community.

Sometimes projects become abandoned. This is when you may have to fork an existing package and make it yours or become a new maintainer if you could reach the current project maintainer.

## Forking an Existing Package

Assuming you manage to find a package that solves your problem or most of it but doesn't have active development, you may consider forking the project. You should respect the rights of the original authors and retain their licensing blocks while retaining attribution.

Depending on what you are doing, original licensing can become problematic. This applies particularly to so called copyleft (or viral) licenses which include GPL and AGPL (a stricter variant) which put restrictions on the usage.

Sometimes the original author or authors are willing to transfer the project to you if you ask. If you are serious about maintaining, doing this can be a good option for forking. You can offer to maintain or fund the project so that it goes forward.

Forking is more expensive than contributing towards a thriving project but it's a worthwhile option. Sometimes you cannot find a package that fits your problem and this is when you have to develop your own.

## Developing Your Own Package

Developing your own package is the extreme option that is the most expensive if the solution you require is complex. Hidden costs appear as you tend to discover more requirements while developing. You may also attract community attention if you develop in public and this in turn may lead to more requirements to appear.

One of early stage problems is figuring out a good name for a package. npm root namespace has become crowded and it can be difficult to find a free name. In addition, you may have to worry about existing trademarks to avoid problems later on. By skipping this you may have to rename your package later as happened for [Jade which had to rename as Pug](https://github.com/pugjs/pug/issues/2184).

npm provides a good way around the naming problem in the form of **scoping**. A scope is defined as `@scope/name` and allows you to group a series of packages behind a custom name space. In addition, scoping allows you to manage people that have access to these packages easily. Scopes are freely available for open source projects.

## Conclusion

Before writing a package of your own, consider spending time with existing packages. You may notice a new package isn't needed after all or that you can contribute to a thriving one. Even forking an old package and revitalizing the effort can be a good option that allows you to save the pain of re-inventing the wheel.

You'll learn how npm packages are structured in the next chapter.
