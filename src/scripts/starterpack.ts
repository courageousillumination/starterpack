import StarterPack from "../core/starterpack";

const main = async () => {
  const starterPack = new StarterPack();
  await starterPack.registerExtension("../extensions/startupScript/");
  await starterPack.registerExtension("../extensions/javascript/");
  await starterPack.registerExtension("../extensions/eslint/");
  await starterPack.registerExtension("../extensions/typescript");
  await starterPack.apply("output");
};

main();
