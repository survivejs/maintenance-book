# Longevity

When developing a project, you should consider its goals and timespan. Some projects are one-off and meant to solve an immediate problem and are then thrown away. Others have more longer term focus and evolve over a long period of time. The question is, how to enable this long term evolution?

You have to consider at least the following aspects:

* Who is going to develop the project?
* Who is going to pay for the development?
* Who is going to make sure the project stays on track?
* What happens if developers disappear from the project?
* How to attract new contributors and maintainers to the project?
* How to keep track of everything that's going on with the project?

## Who Is Going to Develop the Project

In single person projects you develop the project, publish the package, and perhaps forget about it. One day someone might find the project and notice that something is missing. As discussed in the *Processes* chapter, this could lead to a **pull request** and to a new contribution to the project. You gain **contributors** this way.

Instead of using, a user may evolve to a contributor and give something back. The contribution may be random but it's still more active than using. A contributor may become a project **maintainer** given there is enough interest in sustaining the project development. In this case the person becomes someone who will review and merge pull requests.

Sometimes new maintainers may pick up over the project completely as older maintainers fade away and find something else to do. That is normal as interests tend to vary and people move across projects. Spending some time outside of a project help in avoiding burnout or at least help you gain perspective on the project. When you look at a project too close for too long time, it can be difficult to see how to improve since it's so clear to you.

## Who Is Going to Pay for the Development

Although open source software is freely available, this doesn't mean it's free to develop. At least it takes the time and effort from a developer to write and publish it. Some do this for fun or as a hobby, but there are also commercial models that enable developers to dedicate time towards development while getting paid.

The models tend rely either on benevolence (donations), added value (consulting, merchandise), licensing models (dual license), and grants. [Lemonade stand by Nadia Eghbal](https://github.com/nayafia/lemonade-stand), [open funding list by ralphtheninja](https://github.com/ralphtheninja/open-funding), and [Producing Open Source Software by Karl Fogel](http://producingoss.com/en/money.html) cover common options in greater detail.

## Who is Going to Make Sure the Project Stays on Track

A project may have explicit goals or it may evolve organically and find its purpose. Regardless of how it evolves, the maintainers of the project have to shepherd it into a good direction.

In some projects, all design decisions go through a certain person. This model, [Benevolent dictator for life (BDFL)](https://en.wikipedia.org/wiki/Benevolent_dictator_for_life), has proven successful in many cases and it relies on the leadership capabilities of the leader. If there are disputes within the community, the BDFL will have the final say on them.

A project can have a group of core developers that steer the direction of the project together. The model combines with BDFL and doesn't necessary exclude the existence of such in a project.

## What Happens If Developers Disappear from the Project

In the worst case, a project becomes abandoned by its maintainers and new contributions cannot make it to the project. A fork may be needed to rejuvenate the development. The problem is discussed in detail in the *Where to Start Packaging* chapter.

## How to Attract New Contributors and Maintainers to the Project

To keep projects sustainable over longer term, especially the bigger ones focus on attracting new contributors and maintainers. The interests of the different parties have to be aligned for this to work.

At its core you have the project maintainers. Their work is normally split between reviewing new contributions and contributing themselves. The availability of maintainer time tends to be the biggest constraint in large projects as they have to take care to grow contributors into future maintainers.

To even gain contributions, the project should be contributor friendly. Various aspects discussed in this book, such as documentation, are important here because if project is too difficult to contribute to, you won't get contributions. Certain development practices, such as testing and continuous integration, can make it easier to contribute while pushing the quality of contributions higher and avoiding maintainer work.

## How to Keep Track of Everything That's Going on with the Project

As a project grows in complexity, it can become difficult to keep track of it. Popular services, such as GitHub, help here in their own way. Solutions, such as [Octobox](https://octobox.io/), build on top of them and provide developer friendly abstractions that make it more convenient to work with larger amount of projects and issues at once.

## Conclusion

Project longevity is one of the key concerns you should think about when developing a project. This is particularly true if you think the project has a community-driven future for it. Becoming a community project isn't the only way, though, and developing something in small scale can be worthwhile as well.

You'll learn how to market your project in the next chapter.
