# auto-author-assign - Project Guide

## Project Overview

This is a GitHub Action that automatically assigns pull request and issue authors as assignees when they open PRs or issues. It's written in JavaScript and uses the GitHub Actions toolkit.

**Main Purpose**: Simplify PR/issue management by automatically assigning authors as assignees, eliminating the manual step of self-assignment.

## Project Structure

```
auto-author-assign/
├── src/
│   └── index.js           # Main action logic
├── dist/
│   └── index.js           # Compiled/bundled output (via @vercel/ncc)
├── .github/
│   └── workflows/         # CI/CD workflows
├── action.yml             # GitHub Action metadata and configuration
├── package.json           # Dependencies and build scripts
└── README.md              # User-facing documentation
```

## Key Files

### src/index.js
The main implementation file containing the action logic:
- Checks if PR/issue is already assigned (skips if yes)
- Checks if author is a bot (skips if yes)
- Uses GitHub API to assign the author as an assignee
- Handles both pull requests and issues

### action.yml
GitHub Action metadata defining:
- Action name and description
- Input parameters (repo-token)
- Runtime (node20)
- Entry point (dist/index.js)

### dist/index.js
Bundled and compiled version of the action created by @vercel/ncc. This is what GitHub Actions actually runs.

## Technology Stack

- **Runtime**: Node.js 20+
- **Dependencies**:
  - `@actions/core`: GitHub Actions core functionality
  - `@actions/github`: GitHub API client and context
- **Build Tools**:
  - `@vercel/ncc`: Bundles the action into a single file
  - `standard-version`: Automated versioning and changelog

## Development Workflow

### Building the Action
```bash
npm run build
```
This compiles src/index.js into dist/index.js using @vercel/ncc with license information.

### Making Changes
1. Edit code in `src/index.js`
2. Run `npm run build` to update `dist/index.js`
3. Commit both src/ and dist/ changes
4. Create a PR

### Release Process
```bash
npm run release
```
Uses standard-version for automated versioning and changelog generation.

## How It Works

1. **Trigger**: Runs on `pull_request_target` or `issues` events (opened/reopened)
2. **Check Assignees**: If already assigned, skip
3. **Check Author Type**: If author is a bot, skip
4. **Assign**: Use GitHub API to add author as assignee
5. **Log**: Report success or failure

## Important Context

### Why dist/ is Committed
GitHub Actions requires all dependencies to be bundled. The dist/ directory contains the self-contained, runnable action code.

### Why pull_request_target
Uses `pull_request_target` instead of `pull_request` to ensure the action has write permissions even on PRs from forks.

### Permissions Required
- `pull-requests: write` for PR assignment
- `issues: write` for issue assignment

## Common Tasks

### Update Dependencies
```bash
npm update
npm run build  # Rebuild dist with new dependencies
```

### Debug Locally
The action relies on GitHub Actions context, so local testing requires:
- Mocking `@actions/github` context
- Setting up test event payloads

## Code Patterns

### Skip Conditions
The action has two skip conditions:
1. Already assigned (`assignees.length > 0`)
2. Author is a bot (`type === "Bot"`)

### Error Handling
Uses `core.setFailed()` to mark the action as failed, which appears in the GitHub Actions UI.

### API Usage
Uses `octokit.rest.issues.addAssignees()` - note that this endpoint works for both issues and pull requests (PRs are issues in the GitHub API).
