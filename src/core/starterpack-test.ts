import StarterPack from "./starterpack";
import { expect } from "chai";

describe("StarterPack", () => {
  let starterPack: StarterPack;
  beforeEach(() => {
    starterPack = new StarterPack();
  });

  describe("registering extensions", () => {
    it("should register an extension", async () => {
      await starterPack.registerExtension("../testing/testExtension");
      expect(starterPack.getExtensions().length).to.equal(1);
    });
  });

  describe("apply", () => {});
});
