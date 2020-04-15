const core = require("@actions/core");
const github = require("@actions/github");

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload: ${payload}`);
  const token = core.getInput("repo-token", { required: true });

  const { number: issue_number, user: { login: author } } = github.context.payload.pull_request;
  const { owner: { login: owner }, name: repo, }          = github.context.payload.repository;

  (async () => {
    const client = new github.GitHub(token);
    const assignees = [author];
    const result = await client.issues.addAssignees({ owner, repo, issue_number, assignees });
    core.debug(JSON.stringify(result))
  })();

  core.info(`Added assignees to PR ${owner}/${repo}#${issue_number}: ${author}`);
} catch (error) {
  core.setFailed(error.message);
}
