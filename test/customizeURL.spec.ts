import { equal } from "assert";
import customizeURL from "../src/background/customizeURL";

describe("Function customizeURL", () => {
  describe("from tab", () => {
    it("should replace desktopURL with mobileURL", () => {
      equal(customizeURL("test", false), "test"); // Just for test
    });
  });

  describe("from sidebar", () => {
    it("should replace mobileURL with desktopURL", () => {
      equal(customizeURL("test", true), "test"); // Just for test
    });
  });
});