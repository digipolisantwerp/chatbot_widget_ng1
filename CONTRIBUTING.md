# Contribution Guidelines

First off, thanks for taking the time to contribute! :+1:

## I just have a question

You can launch a quick question on the [#acpaas-ui slack channel](https://dgpls.slack.com/messages/C4M60PQJF).

For something that requires longer discussion it may be better to book an issue.

## How do I report bugs / ask features?

Please book a GitHub issue.

## What should I know to get started?

This widget is part of the [ACPaaS UI platform](https://acpaas-ui.digipolis.be). For more info about Smart Widgets, check the [documentation hub](https://github.com/digipolisantwerp/smart-widgets).

Before contributing code, you should be aware of the following:

- The look and feel should match the [Antwerp Core Branding guidelines](https://github.com/a-ui/core_branding_scss).
- The architecture consists of a separate front-end and back-end package. The back-end is a so-called Backend-For-Frontend (BFF). The architecture should conform to the [SA2020 guidelines](https://goo.gl/izTzSH).
- There may be multiple independent front-ends and back-ends for the different technologies that Digipolis supports. All of these should implement the same BFF API. The set of supported technologies is described in the [DAAS standard](https://docs.google.com/spreadsheets/d/e/2PACX-1vR9N3gAJoJFIlaXnpAfSpog85EN1DXJYy5bWHgZ4XKhy8KN1v6xgT4-eaoTTBTEzhIpMGqd_Q11RuKF/pubhtml).

## How can I contribute code?

### Code layout

- `./src` contains the widget source
- `./example` contains the demo app

### Building

`> npm install && bower install`

Commands:

- Build and watch the demo app

  `> gulp`

- Run the demo app

  `> gulp serve`

  Browse to http://localhost:8001/example/index.html

  You also need to start the [backing service](https://github.com/digipolisantwerp/chatbot_service_nodejs).

### Submitting Changes

Please send us your changes as a GitHub pull request.

In order for us to be able to accept your pull request without remarks, please do these things:

- Please update the readme documentation and example app along with the code.
- Provide a clear description on the pull request of what was changed
- Link to a relevant issue. Feel free to create one if none exists.

If possible, do provide meaningful and clean commit messages. A [good commit message](https://chris.beams.io/posts/git-commit/) completes the sentence "When committed this will …"

### Releasing

`gulp bump:major` for major build increase and tag on the current branch.

`gulp bump:minor` for minor build increase and tag on the current branch.

`gulp bump:patch` for patch build increase and tag on the current branch.
