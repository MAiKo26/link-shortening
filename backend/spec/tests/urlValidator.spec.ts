import {isValidUrl} from "../../src/utils/urlValidator";

describe("URL Validator", () => {
  it("should return true for valid URLs", () => {
    const validUrls = [
      "https://www.google.com",
      "http://localhost:3000",
      "https://example.com/path?param=value",
      "http://subdomain.domain.com",
    ];

    validUrls.forEach((url) => {
      expect(isValidUrl(url)).toBe(true);
    });
  });

  it("should return false for invalid URLs", () => {
    const invalidUrls = [
      "not-a-url",
      "http://",
      "https://",
      "",
      "just.words",
      "http://[invalid]",
    ];

    invalidUrls.forEach((url) => {
      expect(isValidUrl(url)).toBe(false);
    });
  });
});
