![Build](https://github.com/toshimaru/auto-author-assign/workflows/Build/badge.svg)

![OG image](./img/auto-author-assign.jpg)

# auto-author-assign

GitHub Actions: Assign pull request author automatically.

## Usage

```yaml
name: 'Auto Author Assign'

on: pull_request

jobs:
  add-assignees:
    runs-on: ubuntu-latest
    steps:
      - uses: toshimaru/auto-author-assign@v1.0.0
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```
