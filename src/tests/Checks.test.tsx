import { fetchChecks } from "../tests/mock/api";
import {
  sortedChecks,
  sortResponse,
  updatedChecks,
  updateResponse,
} from "./mock/utils";

test("All checks should be sorted by priority before initial render", async () => {
  return fetchChecks().then((res) => {
    expect(sortResponse(res)).toEqual(sortedChecks);
  });
});

test("All checks should be updated to have checked and enabled state before initial render", async () => {
  return fetchChecks().then((res) => {
    expect(updateResponse(res)).toEqual(updatedChecks);
  });
});

test("First item should always be enabled", async () => {
  return fetchChecks().then((res) => {
    expect(updateResponse(res)[0].enabled).toBeTruthy();
  });
});
