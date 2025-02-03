import { Octokit } from "@octokit/rest";

export const createOctokitClient = () => {
  return new Octokit({
    auth: "", // github の PAT を入力
  });
};

export const getAllIssues = async (octokitClient) => {
  try {
    const response = await octokitClient.rest.issues.listForRepo({
      owner: "sawada0813",
      repo: "exercises-public",
    });
    response.data.forEach((issue) => {
      console.log(issue.number + ": " + issue.title);
    });
  } catch (e) {
    console.log("Error:", e.message);
  }
};

export const createIssue = async (octokitClient, title) => {
  try {
    return await octokitClient.rest.issues.create({
      owner: "sawada0813",
      repo: "exercises-public",
      title: title,
    });
  } catch (e) {
    console.log("Error:", e.message);
  }
};

export const deleteIssue = async (octokitClient, issueNumber) => {
  try {
    return await octokitClient.rest.issues.update({
      owner: "sawada0813",
      repo: "exercises-public",
      issue_number: issueNumber,
      state: "closed",
    });
  } catch (e) {
    console.log("Error:", e.message);
  }
};
