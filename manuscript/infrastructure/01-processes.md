# Processes

Each project has processes around it. Services like [GitHub](https://github.com/), [GitLab](https://gitlab.com/), and [Bitbucket](https://bitbucket.org/) provide plenty of infrastructure you need. At minimum they provide **version control** for project source. You can also find **issue tracker** and other supporting functionality like means to accept **pull requests** against projects. Often you can host the official site of a project on these platforms.

## Issue Tracking

In a small project you might be aware of everything you need to do. You implement what you intend and publish. That's it.

It gets more complex if you plan for the future or if the users of the package discover problems. This where **issue tracking** is required.

### What Issue Data to Capture

Depending on the system, an issue contains at least the following data: title, description, labels or tags. It may also be assigned to a milestone or to specific project members, or projects in GitHub.

The point is to capture this data so that development decisions can be made. An issue itself can be a feature request, a bug report, or sometimes a support request. It's up to project policies on how to deal with support in particular and in some cases support requests are pushed to specific channels while the official issue tracker of the project is limited only for development purposes.

### Capturing the Right Data

Especially popular projects are constrained by the amount of maintainers they have. This means that the demand for support in different means can exceed the bandwidth of the team. Managing issue tracking well is one of the keys to dealing with this problem.

Poorly formatted issues waste time. In the worst case you have to dig the information you require to debug the problem. The problem can be solved by improving the standard of issues and not accepting poor ones.

In GitHub this can be achieved by using an [issue template](https://github.com/serverless/serverless/blob/master/.github/ISSUE_TEMPLATE.md) that's included within a repository. When a user fills in an issue, the provided template will work as a starting point. Unfortunately, given it's in text format, it doesn't solve the problem entirely. Bots discussed in the *Automation* chapter solve this problem as they can close poor quality issues.

## Pull Requests

Instead of requesting for features or reporting bugs, sometimes the users may scratch their own itch and provide **pull requests** to a project. The point is to provide a small patch to the project that can then be merged provided it's high enough quality.

Pull requests share similar problems as issues. As issues, also [pull requests have templates](https://github.com/serverless/serverless/blob/master/.github/PULL_REQUEST_TEMPLATE.md) in GitHub but the same caveat as before applies and there are a few additional problems as well.

How can you make sure the proposed change doesn't break anything? This is where testing and *Continuous Integration* discussed in the next chapter come in. It's difficult to have full guarantees but at least you can make it harder for functionality to break by implementing the right practices to your project.

## Designing Development Process

An important part of development practices is designing a development process. Especially early on this can be ad hoc as you don't have to worry about team productivity. Once more people become involved, you have to make sure they can contribute in a meaningful manner.

This is where managing issue tracking and pull requests well becomes vital. You should design a system for issues where you set them in a particular way. For example, each issue could gain a priority (0-4 for example), categorization (bug, feature request), and difficulty (0-3 for example). The labels you need depend on the type of the project and there's no one right answer on which labels to use.

In GitHub pull requests may use labels as well. Most importantly it's a chance for you to apply reviews on code. That is your chance to discuss the implementation until it's in a satisfactory state. It's also a chance to grow new contributors to your project. They may even become maintainers one day and assume your position in the project.

## Designing a Support Model

Once a project reaches certain scale, managing support becomes a problem. GitHub's issue tracker works up to a point. Sometimes bigger projects push questions to services like Stack Overflow. This is also where commercial support may be provided as there is no obligation to help free even if the code is freely available.

One of the best ways to deal with support is to reduce the amount of support required through design and documentation. If certain part of software requires constant support, perhaps it could be re-designed in such way that it's easier to understand. Documentation can make it easier to understand the concepts behind the implementation and provide the needed knowledge to get most out of the design.

T> The *Documentation* part of the book digs deeper into these topics.

## Conclusion

Designing and maintaining solid development processes is an important part of project maintenance. A good process supports project longevity and encourages people to push it further. A bad process hinders progress and may even make it impossible. It's an important aspect of a project to get right.

You'll learn about continuous integration in the next chapter. The practice complements process thinking in a technical manner.
