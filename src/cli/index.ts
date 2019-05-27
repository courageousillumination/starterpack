import yargs from "yargs";
import StarterPack from "../core/starterpack";
import fs from "fs";

const OUTPUT_DIR = "output";

const getArguments = () => {
  return yargs
    .array("extensions")
    .string("extensions")
    .default("extensions", [])
    .string("config")
    .string("save-config").argv;
};

const createFromConfig = async (configFile: string): Promise<StarterPack> => {
  const contents = fs.readFileSync(configFile, "ascii");
  return StarterPack.createFromConfig(JSON.parse(contents));
};

const saveConfig = (path: string, starterPack: StarterPack) => {
  fs.writeFileSync(
    path,
    JSON.stringify(starterPack.getFullConfig(), undefined, 2)
  );
};

const main = async () => {
  const args = getArguments();
  const starterPack = args.config
    ? await createFromConfig(args.config)
    : new StarterPack();
  const extensions = args.extensions;
  for (const extension of extensions) {
    await starterPack.registerExtension(`../extensions/${extension}`);
  }

  const loadedExtensions = starterPack
    .getExtensions()
    .map(ex => ex.extensionId);
  console.log(`Loaded extensions: ${loadedExtensions.join(", ")}`);

  const saveConfigTo = args["save-config"];
  if (!saveConfigTo) {
    await starterPack.apply("output");
    console.log(`Wrote project to ${OUTPUT_DIR}`);
  } else {
    saveConfig(saveConfigTo, starterPack);
    console.log(`Wrote starterpack config to ${saveConfigTo}`);
  }
};

export default main;
