const core = require("@actions/core");
const github = require("@actions/github");

try {
  const token = core.getInput("repo-token", { required: true });
  const { assignees, number, user: { login: author } } = github.context.payload.pull_request;
  const { name: repo, } = github.context.payload.repository;

  if (assignees.length > 0) {
    core.info('Skips the process to add assignees since the pull request is already assigned to someone');
    return;
  }

  (async () => {
    const client = new github.GitHub(token);
    const result = await client.issues.addAssignees({ owner: github.repository_owner, repo, issue_number: number, assignees: [author] });
    core.debug(JSON.stringify(result));
  })();

  core.info(`Assigned @${author} to pull request #${number}`);
} catch (error) {
  core.setFailed(error.message);
}
