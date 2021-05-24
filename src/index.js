import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';

async function run() {
  try {
    const token = core.getInput("repo-token", { required: true });
    if (context.payload.pull_request === undefined) {
      throw new Error("Can't get pull_request payload. Check you trigger pull_request event");
    }
    const { assignees, number, user: { login: author, type } } = context.payload.pull_request;

    if (assignees.length > 0) {
      core.info(`Assigning author has been skipped since the pull request is already assigned to someone`);
      return;
    }
    if (type === 'Bot') {
      core.info("Assigning author has been skipped since the author is a bot");
      return;
    }

    const octokit = getOctokit(token);
    const result = await octokit.rest.issues.addAssignees({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: number,
      assignees: [author]
    });
    core.debug(JSON.stringify(result));
    core.info(`@${author} has been assigned to the pull request: #${number}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
