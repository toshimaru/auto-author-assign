# AI Agent Guide

Guidance for any AI assistant working with this repository.

## Project Overview

**auto-author-assign** is a GitHub Action that automatically assigns pull request (and optionally issue) authors as assignees. When a PR or issue is opened/reopened, this action assigns the author to it.

## Tech Stack

- **Runtime**: Node.js 20+
- **Build Tool**: Rollup (bundles source into single dist/index.js)
- **Dependencies**: @actions/core, @actions/github
- **Release**: release-please (automated via GitHub Actions)

## Common Commands

```bash
# Install dependencies
npm ci

# Build the action (bundles src/index.js → dist/index.js)
npm run package
```

**Releases**: Handled automatically by release-please. When PRs with conventional commits are merged to `main`, release-please creates/updates a release PR. Merging that PR triggers the release.

## Project Structure

```
├── src/index.js       # Main action source code
├── dist/index.js      # Bundled output (committed, auto-generated)
├── action.yml         # GitHub Action metadata and inputs
├── rollup.config.js   # Rollup bundler configuration
└── .github/
    └── workflows/
        ├── build.yml         # CI: builds and checks dist is up-to-date
        ├── ci.yml            # Tests the action on PRs
        └── release-please.yml # Automated releases
```

## Key Development Notes

- **Always rebuild before committing**: After modifying `src/index.js`, run `npm run package` and commit the updated `dist/index.js`. The CI will fail if dist is out of sync.
- **Single source file**: All action logic is in `src/index.js` (~40 lines)
- **No tests**: This project currently has no automated tests (`npm test` exits with error)
- **GitHub access**: Use the `gh` CLI for any required GitHub interactions.

## Action Behavior

The action skips assignment when:
1. Someone is already assigned as an assignee
2. The author is a bot (type === "Bot")

## Input Configuration

| Input | Description | Default |
|-------|-------------|---------|
| `repo-token` | GitHub token for API calls | `${{ github.token }}` |
