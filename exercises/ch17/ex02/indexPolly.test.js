import {
  createOctokitClient,
  getAllIssues,
  createIssue,
  deleteIssue,
} from "./index.js";

import { describe, expect, jest, test } from "@jest/globals";
import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import LocalStoragePersister from "@pollyjs/persister-local-storage";

Polly.register(NodeHttpAdapter);
Polly.register(LocalStoragePersister);

describe("w/ Pollyjs", () => {
  let octokitClient;
  let polly;
  const dummyIssueToDelete = "deleteIssue test";
  let issueId;
  beforeAll(async () => {
    polly = new Polly("Simple Example", {
      adapters: ["node-http"],
      persister: "local-storage",
      recordIfMissing: true,
      logLevel: "info",
    });

    // 削除用のチケットを作成
    octokitClient = await createOctokitClient();
    const response = await createIssue(octokitClient, dummyIssueToDelete);
    issueId = response.data.number;
  });

  test("getAllIssues", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await getAllIssues(octokitClient);
    expect(logSpy).toHaveBeenCalledWith("2: Hello world");
  });

  test("createIssue", async () => {
    const dummyTitle = "createIssue test";
    const response = await createIssue(octokitClient, dummyTitle);
    expect(response.data.title).toBe(dummyTitle);
  });

  test("deleteIssue", async () => {
    const response = await deleteIssue(octokitClient, issueId);
    expect(response.data.title).toBe(dummyIssueToDelete);
  });
});
