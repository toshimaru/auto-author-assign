[![Build](https://github.com/toshimaru/auto-author-assign/actions/workflows/build.yml/badge.svg)](https://github.com/toshimaru/auto-author-assign/actions/workflows/build.yml)

# auto-author-assign

GitHub Actions: Automatically assign pull request authors.

![OG image](./img/auto-author-assign.jpg)

## Why this action?

In most cases, the pull request author should be assigned as an **assignee** of the pull request.

This action automatically assigns the pull request author as an assignee.

## Usage

```yml
# .github/workflows/auto-author-assign.yml
name: Auto Author Assign

on:
  pull_request_target:
    types: [ opened, reopened ]

permissions:
  pull-requests: write

jobs:
  assign-author:
    runs-on: ubuntu-latest
    steps:
      - uses: toshimaru/auto-author-assign@v3.0.0
```

## Use your own token

You can specify your own token.

```yml
jobs:
  assign-author:
    runs-on: ubuntu-latest
    steps:
      - uses: toshimaru/auto-author-assign
        with:
          repo-token: ${{ secrets.YOUR_TOKEN }}
```

If not specified, `GITHUB_TOKEN` will be used by default.

## Enable auto-author-assign for issues

An issue's author can be automatically assigned as an issue assignee.

- Add `issues` to the trigger
- Add `issues: write` to the permissions

```yml
on:
  issues:
    types: [ opened, reopened ]
  pull_request_target:
    types: [ opened, reopened ]

permissions:
  issues: write
  pull-requests: write

jobs:
  ...
```

## Skip assigning the author

The `auto-author-assign` action skips assigning the author when:

1. Someone is already assigned as an assignee
1. The author is a bot
