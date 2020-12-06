![Build](https://github.com/toshimaru/auto-author-assign/workflows/Build/badge.svg)

# auto-author-assign

GitHub Actions: Assign pull request author automatically.

![OG image](./img/auto-author-assign.jpg)

## Why this action?

In most cases, pull request author should be assigned an assignee of the pull request.

This action automatically assigns PR author as an assignee.

## Usage

```yaml
# .github/workflows/auto-author-assign.yml
name: 'Auto Author Assign'

on:
  pull_request_target:
    types: [opened, reopened]

jobs:
  assign-author:
    runs-on: ubuntu-latest
    steps:
      - uses: toshimaru/auto-author-assign@v1.2.0
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```

## Skip assigning author

`auto-author-assign` action skips assigning the author when:

- Someone is already assigned as an assignee
- The author is a bot
