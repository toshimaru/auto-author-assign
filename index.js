const core = require("@actions/core");
const github = require("@actions/github");

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const token = core.getInput("repo-token", { required: true });
  const client = new github.GitHub(token);
  const { number, user } = github.context.payload.pull_request;
  const author = user.login;
  const { owner: ownerinfo, name: repo, } = github.context.payload.repository;
  const owner = ownerinfo.login;

  client.issues.addAssignees({ owner, repo, number, author });
  core.info(`Added assignees to PR #${number}: ${author}`);
} catch (error) {
  core.setFailed(error.message);
}
