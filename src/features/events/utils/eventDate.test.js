import assert from "node:assert/strict";
import test from "node:test";
import {
  formatEventDate,
  localDateTimeToIso,
  toLocalDateTimeInput,
} from "./eventDate.js";

test("formats valid event timestamps in the viewer's locale", () => {
  assert.notEqual(
    formatEventDate("2030-01-01T10:00:00.000Z"),
    "Date to be confirmed",
  );
});

test("handles invalid event timestamps explicitly", () => {
  assert.equal(formatEventDate("invalid"), "Date to be confirmed");
  assert.equal(toLocalDateTimeInput("invalid"), "");
  assert.equal(localDateTimeToIso("invalid"), null);
});

test("converts local datetime input to an ISO timestamp", () => {
  const timestamp = localDateTimeToIso("2030-01-01T10:00");
  assert.equal(new Date(timestamp).toISOString(), timestamp);
  assert.equal(toLocalDateTimeInput(timestamp), "2030-01-01T10:00");
});
