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
      - uses: TODO
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```
