const core = require("@actions/core");
const github = require("@actions/github");

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  const token = core.getInput("repo-token", { required: true });
  const { assignees, number, user: { login: author, type } } = github.context.payload.pull_request;

  if (assignees.length > 0) {
    core.info('Skips the process to add assignees since the pull request is already assigned to someone');
    return;
  }

  if (type === 'bot') {
    core.info("Skips the process to add assignees since the author is bot");
    return;
  }

  (async () => {
    const client = new github.GitHub(token);
    const result = await client.issues.addAssignees({ 
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: number,
      assignees: [author] 
    });
    core.debug(JSON.stringify(result));
  })();

  core.info(`@${author} has been assigned to the pull request: #${number}`);
} catch (error) {
  core.setFailed(error.message);
}
