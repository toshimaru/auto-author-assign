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
      - uses: toshimaru/auto-author-assign@v0.0.1
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```
