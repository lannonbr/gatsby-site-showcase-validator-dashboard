const fetch = require("node-fetch");
require("dotenv").config();

const { Octokit } = require("@octokit/rest");

(async () => {
  // Spin up a client
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  // get all of the workflows
  const {
    data: { workflows }
  } = await octokit.actions.listRepoWorkflows({
    owner: "gatsbyjs",
    repo: "gatsby"
  });

  // get the site showcase validator workflow
  const workflow = workflows.filter(workflow =>
    workflow.name.includes("Site Showcase Validator")
  )[0].id;

  // get the workflow runs
  const {
    data: { workflow_runs }
  } = await octokit.actions.listWorkflowRuns({
    owner: "gatsbyjs",
    repo: "gatsby",
    workflow_id: workflow
  });

  // get the newest run
  const run = workflow_runs[0].id;

  // get the jobs for this particular run
  const {
    data: { jobs }
  } = await octokit.actions.listJobsForWorkflowRun({
    owner: "gatsbyjs",
    repo: "gatsby",
    run_id: run
  });

  // get the only job
  const job = jobs[0].id;

  // get the URL for the logs
  const { url } = await octokit.actions.listWorkflowJobLogs({
    owner: "gatsbyjs",
    repo: "gatsby",
    job_id: job
  });

  // fetch the logs
  const text = await fetch(url, {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`
    }
  }).then(resp => resp.text());

  const entries = text
    .split("\r\n")
    .filter(line => line.includes("[Notice]") || line.includes("[Err]"));

  console.log(entries);
})();
