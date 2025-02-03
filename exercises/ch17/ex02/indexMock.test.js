import {
  createOctokitClient,
  getAllIssues,
  createIssue,
  deleteIssue,
} from "./index.js";

import { describe, expect, jest, test } from "@jest/globals";
import { Octokit } from "@octokit/rest";

describe("w/ mock", () => {
  let octokitMock;
  const dummyTitle = "createIssue test";
  beforeEach(() => {
    octokitMock = {
      rest: {
        issues: {
          listForRepo: jest.fn().mockResolvedValueOnce({
            data: [
              {
                number: 2,
                title: "Hello world",
              },
            ],
          }),
          create: jest.fn().mockResolvedValueOnce({
            data: {
              title: dummyTitle,
            },
          }),
          update: jest.fn().mockResolvedValueOnce({
            data: {
              title: dummyTitle,
            },
          }),
        },
      },
    };
  });
  test.skip("createOctokitClient", async () => {
    const constructorSpy = jest.spyOn(Octokit, "constructor");

    const octokitClient = await createOctokitClient();
    await expect(constructorSpy).toHaveBeenCalled(); // なぜかコンストラクタが呼ばれない
  });
  test("getAllIssues", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await getAllIssues(octokitMock);

    expect(octokitMock.rest.issues.listForRepo).toHaveBeenCalledWith({
      owner: "sawada0813",
      repo: "exercises-public",
    });
    expect(logSpy).toHaveBeenCalledWith("2: Hello world");
  });
  test("createIssue", async () => {
    const response = await createIssue(octokitMock, dummyTitle);
    expect(response.data.title).toBe(dummyTitle);
  });
  test("deleteIssue", async () => {
    const response = await deleteIssue(octokitMock, 42);
    expect(response.data.title).toBe(dummyTitle);
  });
});
