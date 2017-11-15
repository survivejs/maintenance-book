# Processes

Each project has processes around it. Services like [GitHub](https://github.com/), [GitLab](https://gitlab.com/), and [Bitbucket](https://bitbucket.org/) provide plenty of infrastructure you need. At minimum they provide **version control** for project source. You can also find **issue tracker** and other supporting functionality like means to accept **pull requests** against projects. Often you can host the official site of a project on these platforms.

When you think about processes, you get at least the following questions:

* How to track issues?
* How to manage pull requests?
* How to design a development process?
* How to support users?

## How to Track Issues

In a small project you might be aware of everything you need to do. You implement what you intend and publish. That's it.

It gets more complex if you plan for the future or if the users of the package discover problems. This where **issue tracking** is required.

### What Issue Data to Capture

Depending on the system, an issue contains at least the following data: title, description, labels or tags. The point is to capture this data so that development decisions can be made.

An issue itself can be a feature request, a bug report, or sometimes a support request. It's up to project policies on how to deal with support in particular as discussed later in this chapter.

### Capturing the Right Data

Especially popular projects are constrained by the amount of maintainers they have. This means that the demand for support in different means can exceed the bandwidth of the team. Managing issue tracking well is one of the keys to dealing with this problem.

Poorly formatted and incomplete issues waste time. In the worst case you have to dig the information you require to debug the problem. The problem can be solved by improving the standard of issues and not accepting poor ones.

In GitHub this can be achieved by using an [issue template](https://github.com/serverless/serverless/blob/master/.github/ISSUE_TEMPLATE.md) that's included within a repository. When a user fills in an issue, the provided template will work as a starting point. Unfortunately, given it's in text format, it doesn't solve the problem entirely. Bots discussed in the _Automation_ chapter try to solve this problem as they can close poor quality issues as long as certain criteria is met.

## How to Manage Pull Requests

Instead of requesting for features or reporting bugs, sometimes the users may scratch their own itch and provide **pull requests** to a project. The point is to provide a small patch to the project that can then be merged assuming it's high enough quality.

Pull requests share similar problems as issues. As issues, also [pull requests have templates](https://github.com/serverless/serverless/blob/master/.github/PULL_REQUEST_TEMPLATE.md) in GitHub but the same caveat as before applies and there are a few additional problems as well.

How can you make sure the proposed change doesn't break anything? This is where testing and _Continuous Integration_ discussed in the next chapter come in. It's difficult to have full guarantees but at least you can make it harder for functionality to break by implementing the right practices to your project.

## How to Design a Development Process

![Maintainers, contributors, and users](images/maintenance.png)

An important part of development practices is designing a development process. Especially early on this can be ad hoc as you don't have to worry about team productivity. Once more people become involved, you have to make sure they can contribute in a meaningful way.

This is where managing issue tracking and pull requests well becomes vital. You should design a system for issues where you set them in a particular way. For example, each issue could gain a priority (0-4 for example), categorization (bug, feature request), and difficulty (0-3 for example). The labels you need depend on the type of the project and there's no one right answer on which labels to use.

Most importantly it's a chance for you to apply reviews on code. You can discuss the implementation until it's in a satisfactory state. It's also a chance to grow new contributors to your project. They may even become maintainers one day and assume your position in the project.

### Choosing a Git Branching Model

Flexible branching is one of the core features of Git. At simplest level, you can forget branching exists and develop against the default `master` branch. It gets more complicated when you want to experiment or work with other people, though. This is where different branching models come in.

[Gitflow](https://github.com/nvie/gitflow) is one of the most famous approaches. The idea is that you develop any new functionality in an appropriately named branch and then coordinate releases through release branches that eventually get merged into the `master` branch.

Utilizing only **feature branches** and then merging the work back to `master` can be enough for smaller projects. This avoids some of the complexity related to Gitflow. The heavier structure may pay off if there is a large amount of development to coordinate, though, so you should choose your approach carefully.

T> [Atlassian has written a guide to different Git branching models.](https://www.atlassian.com/git/tutorials/comparing-workflows).

### Coordinating Teams

As a project grows and has more people working on it, more communication and coordination is required to keep the project running smoothly. This is one of the hardest problems in software development as it gets the more complex, the more people you add to the mix. It's made harder in open source as people have different motivations and the culture is mixed. Sometimes this is a good thing but it's also a challenge at times.

This complexity can be tamed by developing organization structure. Instead of working in an ad hoc manner, people will assume different responsibilities following skills and interests. If multiple people align well enough, it can make sense for them to form teams. These teams in turn have to coordinate their work but now the problem has been pushed a notch further. There's still coordination to do but there's more structure in place.

T> Platforms like GitHub model the concept of team in system level. If you use a GitHub organization for a project, you can assign people to teams and assign specific rights to the teams. Teams can also be used in npm to make it easier to share release rights for example.

T> The _Longevity_ chapter discusses the issue further.

### Maintaining Project Focus

<!-- textlint-disable stop-words -->

To paraphrase Jono Bacon, managing open source projects is like herding cats. Everyone wants to do the thing they want and strict central control is difficult for this reason. The challenge is allowing people to do what they want while allowing the project to move forward. The downside of this is that some people still have to do some of the less pleasant work to keep wheels moving.

<!-- textlint-enable -->

This nature has also implications on the nature of development. It might be sporadic and sudden. A lot of progress might happen in short time as long as there's interest and then the development might stall for a while until development picks up again. Also the way you manage new contributions affects this as the longer your contributors have to wait, the more frustrated they tend to get.

How to manage this type of situation? There's no one correct way and projects tend to develop models of their own with varying success. One of the best things you can do, however, is to maintain clear goals for the project. Doing this allows you to make contextual decisions. If something goes beyond the boundaries, it doesn't belong to the project. Saying **no** is at least as important as saying **yes**.

Taken further, abstract project goals can lead to a **project roadmap** that describes what the project wants to accomplish in the near and far future. The point is to energize people to move towards the goals. The roadmap can change but can be used to communicate what's to come. It will give confidence to the project direction as people know what to expect.

## How to Support Users

Once a project reaches certain scale, managing support becomes a problem. GitHub's issue tracker works up to a point. Sometimes bigger projects move the problem of support level questions to services like Stack Overflow. This is also where commercial support may be provided as there is no obligation to help free even if the code is freely available.

One of the best ways to deal with support is to reduce the amount of support required through design and documentation. If certain part of software requires constant support, it could be re-designed in such way that it's easier to understand. Documentation can make it easier to understand the concepts behind the implementation and provide the needed knowledge to get most out of the design.

T> The _Documentation_ part of the book digs deeper into these topics.

## Conclusion

Designing and maintaining solid development processes is an important part of project maintenance. A good process supports project longevity and encourages people to push it further. A bad process hinders progress and may even make it impossible. It's an important aspect of a project to get right.

You'll learn about continuous integration in the next chapter. The practice complements process thinking in a technical way.
