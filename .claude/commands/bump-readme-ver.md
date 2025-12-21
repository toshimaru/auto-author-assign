Read the version from package.json and update README.md accordingly.

Steps:
1. Parse the "version" field from package.json
2. Find and update the version reference in README.md (look for patterns like `v1.2.3`, `version: 1.2.3`, or badge URLs)
3. Stage and commit with message: "docs: bump version to X.X.X in README.md"

If package.json doesn't exist, exit with an error message.

Only modify the version string, preserve all other content.
