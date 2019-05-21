import StarterPack from "../core/starterpack";

const main = async () => {
  const starterPack = new StarterPack();
  await starterPack.registerExtension("../extensions/javascript/");
  await starterPack.registerExtension("../extensions/eslint/");
  await starterPack.apply("output");
};

main();
