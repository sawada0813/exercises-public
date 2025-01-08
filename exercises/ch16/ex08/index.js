import { Octokit } from "@octokit/rest";

if (3 < process.argv.length) {
  console.log("Usage: node index.js <true/false>");
  process.exit(1);
}

if (process.argv[2] === "-h") {
  console.log(
    'If you want to display HTTP request logs, you can use "-v" option.',
  );
  process.exit(0);
}

// PAT は issue 操作の read/write 権限を持つものを使用
const octokit = new Octokit({
  auth: ``, // github の PAT を入力
  log: process.argv[2] === "-v" ? console : undefined,
});

const getAllIssues = async () => {
  try {
    const response = await octokit.rest.issues.listForRepo({
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

const createIssue = async (title) => {
  try {
    await octokit.rest.issues.create({
      owner: "sawada0813",
      repo: "exercises-public",
      title: title,
    });
  } catch (e) {
    console.log("Error:", e.message);
  }
};

const deleteIssue = async (issueNumber) => {
  try {
    await octokit.rest.issues.update({
      owner: "sawada0813",
      repo: "exercises-public",
      issue_number: issueNumber,
      state: "closed",
    });
  } catch (e) {
    console.log("Error:", e.message);
  }
};

const questionCreateOrDelete = () => {
  console.log("Which do you want, create issue or delete issue? (c/d)");
};

let isFirstQuestion = true;
let shouldCreateIssue = false;
let shouldDeleteIssue = false;

questionCreateOrDelete();

process.stdin.on("data", async (data) => {
  if (isFirstQuestion) {
    if (data.toString().trim() === "d") {
      console.log("Type the issue number of the issue you want to delete.");
      isFirstQuestion = false;
      shouldDeleteIssue = true;
    } else if (data.toString().trim() === "c") {
      console.log("Type the title of the issue you want to create.");
      isFirstQuestion = false;
      shouldCreateIssue = true;
    }
  } else {
    if (shouldCreateIssue) {
      await createIssue(data.toString());
      isFirstQuestion = true;
      shouldCreateIssue = false;
    } else if (shouldDeleteIssue) {
      await deleteIssue(data.toString());
      isFirstQuestion = true;
      shouldCreateIssue = false;
    }
    questionCreateOrDelete();
  }
  getAllIssues();
});

// ;(async () => {
//   try {
//     const createRequest = {
//       owner: 'sawada0813',
//       repo: 'exercises-public',
//       title: process.stdin,
//     }
//     console.log(createRequest)
//     await octokit.rest.issues.create(createRequest)
//   } catch (e) {
//     console.log('Error:', e.message)
//   }
// })()
