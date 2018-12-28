# Processes

Each project has processes around it. Services like [GitHub](https://github.com/), [GitLab](https://gitlab.com/), and [Bitbucket](https://bitbucket.org/) provide plenty of tool to manage open source projects: **version control** for project source, **issue tracker**, **pull requests** to accept code from your users, and often hosting your project site.

When you think about processes, you get at least the following questions:

- How to track issues?
- How to manage pull requests?
- How to design a development process?
- How to support users?

## How to Track Issues

Your users will want to report a bug, request a new feature or ask how to use a certain function.

### What Issue Data to Capture

An issue usually contains at least the following data: title, description, labels or tags.

An issue itself can be a feature request, a bug report, or sometimes a support request. It’s up to project policies on how to deal with support in particular as discussed later in this chapter.

You can use labels to sort issues. For example, create labels for priorities (0-4 for example), issue types (bug, feature request), and difficulty (0-3 for example). Default GitHub labels “help wanted” and “good first issue” may attract new contributors — there are even sites to show these issues in different projects, like [Up For Grabs](http://up-for-grabs.net/).

### Capturing the Right Data

Especially popular projects are constrained by the amount of maintainers they have. This means that the demand for support can exceed the bandwidth of the team. Managing issues well is one of the keys to dealing with this problem.

Poorly formatted and incomplete issues waste time. In the worst case you won’t have enough information to reproduce the issue and couldn’t help the user. The problem can be solved by improving the standard of issues and not accepting poor ones.

GitHub’s [issue templates](https://help.github.com/articles/creating-an-issue-template-for-your-repository/) can help with this issue. When a user creates an issue, they will see the template instead of a blank text field. [Babel](https://raw.githubusercontent.com/babel/babel/master/.github/ISSUE_TEMPLATE.md) and [npm](https://raw.githubusercontent.com/npm/npm/latest/.github/issue_template.md) have good examples of issue templates. Unfortunately, these templates are only text, and the user may (and many of them do) remove it, so some projects use bots to verify that the user has answered questions from the template, see the _Automation_ chapter for more details.

## How to Manage Pull Requests

Instead of requesting new features or reporting bugs, users may send **pull requests** to a project. Pull request is usually a small patch to the project that can be merged if maintainers agree with the change and code quality is good enough.

GitHub’s [pull request templates](https://help.github.com/articles/creating-a-pull-request-template-for-your-repository/) can be used to point contributors to contribution guidelines and as a check list to verify a pull request before submission. [React](https://raw.githubusercontent.com/facebook/react/master/.github/PULL_REQUEST_TEMPLATE.md) and [Serverless](https://raw.githubusercontent.com/serverless/serverless/master/.github/PULL_REQUEST_TEMPLATE.md) have good examples.

How can you make sure the proposed change doesn’t break anything? Testing and _Continuous Integration_ discussed in the next chapter can help with that.

## How to Design a Development Process

When you’re working on a project alone, you can keep all the details and plans in your help, but as soon as other people start to help, you need to be more transparent on what are you doing, direction of the project and workflow that contributors should follow.

### Choosing a Git Branching Model

Flexible branching is one of the core features of Git. At simplest level, you can work in the default `master` branch, but when you want to experiment or work with other people, multiple branches will allow you to work on multiple tasks at the same time.

[Gitflow](https://github.com/nvie/gitflow) is one of the most famous approaches. The idea is that you develop any new functionality in an appropriately named branch, then merge them into a release branch, that eventually get merged into the `master` branch.

Using only **feature branches** and then merging the work back to `master` can be enough for smaller projects. This avoids some of the complexity related to Gitflow. The heavier structure may pay off if there is a large amount of development to coordinate.

T> Read more in the Atlassian’s [guide to different Git branching models](https://www.atlassian.com/git/tutorials/comparing-workflows).

### Coordinating Teams

As a project grows and has more people working on it, more communication and coordination is required to keep the project running smoothly — this is one of the hardest problems in software development It’s even harder in open source as people have different motivations and limited time.

This complexity can be tamed by developing organization structure. Instead of working in an ad hoc manner, people will take different responsibilities according to their skills and interests. If multiple people align well enough, it can make sense for them to form smaller teams. These teams in turn have to coordinate their work but coordination of a small team is easier than of a large one.

T> If you use a _GitHub organization_ for a project, you can assign people to _teams_ and assign specific rights to the teams. Teams can also be used in npm to make it easier to share release rights.

T> The _Longevity_ chapter discusses the issue further.

### Maintaining Project Focus

<!-- textlint-disable stop-words -->

To paraphrase Jono Bacon, managing open source projects is like herding cats. Everyone wants to do the thing they want and strict central control is difficult for this reason. The challenge is allowing people to do what they want while allowing the project to move forward. The downside of this is that some people still have to do some of the less pleasant work to keep wheels moving.

<!-- textlint-enable -->

This nature also affects development. It might be sporadic and sudden. A lot of progress might happen in short time as long as there’s interest and then the development might stall for a while until it picks up again. Also the way you manage new contributions affects this as the longer your contributors have to wait, the more frustrated they tend to get.

How to manage this situation? There’s no one correct way and projects tend to develop models of their own with varying success. One of the best things you can do, however, is to maintain clear goals for the project. Saying **no** is at least as important as saying **yes**.

**Project roadmap** is a more specific description of what the project wants to accomplish in the near and far future. The roadman will energize people to move towards the goals, it will give confidence to the project direction as people know what to expect.

## How to Support Users

Once a project reaches certain scale, managing support questions becomes a problem. GitHub’s issue tracker works up to a point. Sometimes bigger projects move the problem of support questions to services like Stack Overflow. This is also where commercial support may be provided as there is no obligation to help free even if the code is freely available.

One of the best ways to deal with support is to reduce the amount of support required through design and documentation. If certain part of software requires constant support, it could be redesigned to make it easier to use. Documentation can make the concepts behind the implementation easier to understand.

T> The _Documentation_ part of the book digs deeper into these topics.

## Conclusion

Designing and maintaining solid development processes is an important part of project maintenance. A good process supports project longevity and encourages people to push it further. A bad process hinders progress and may even make it impossible.

You’ll learn about continuous integration in the next chapter. The practice complements process thinking in a technical way.
