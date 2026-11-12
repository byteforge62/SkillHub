import assert from "node:assert/strict";
import test from "node:test";
import { getSafeExternalUrl } from "./lessonBlockUtils.js";

test("allows only absolute HTTP and HTTPS URLs", () => {
  assert.equal(getSafeExternalUrl("https://example.com/video.mp4"), "https://example.com/video.mp4");
  assert.equal(getSafeExternalUrl("http://example.com/image.png"), "http://example.com/image.png");
  assert.equal(getSafeExternalUrl("javascript:alert(1)"), null);
  assert.equal(getSafeExternalUrl("data:text/html,unsafe"), null);
  assert.equal(getSafeExternalUrl("not a url"), null);
  assert.equal(getSafeExternalUrl(null), null);
});
