import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

async function run() {
  try {
    const target = context.payload.pull_request || context.payload.issue
    if (target === undefined) {
      throw new Error("Can't get payload. Check you trigger event");
    }
    const { assignees, number, user: { login: author, type } } = target;

    if (assignees.length > 0) {
      core.info("Assigning author has been skipped since the pull request is already assigned to someone");
      return;
    }

    if (type === "Bot") {
      core.info("Assigning author has been skipped since the author is a bot");
      return;
    }

    const token = core.getInput("repo-token", { required: true });
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
