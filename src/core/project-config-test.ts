import ProjectConfiguration from "./project-config";
import { expect } from "chai";

describe("ProjectConfiguration", () => {
  let config: ProjectConfiguration;
  beforeEach(() => {
    config = new ProjectConfiguration();
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
