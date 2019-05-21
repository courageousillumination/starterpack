import Configuration from "./config";
import { expect } from "chai";

describe("Configuration", () => {
  let config: Configuration;
  beforeEach(() => {
    config = new Configuration();
  });
  describe("simple option operations", () => {
    beforeEach(() => {
      config.addConfigurationOption({ name: "foo", value: "bar" });
    });

    it("should support adding and reading an option", () => {
      expect(config.getOptionValue("foo")).to.equal("bar");
    });

    it("should support setting an option value", () => {
      config.setOptionValue("foo", "baz");
      expect(config.getOptionValue("foo")).to.equal("baz");
    });
  });
});
