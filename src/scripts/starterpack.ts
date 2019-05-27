#!/usr/bin/env/node
import StarterPack from "../core/starterpack";
import readline from "readline";
import { promptAsync } from "../utils/readline";

const EXTENSIONS = [
  "startupScript",
  "javascript",
  "eslint",
  "typescript",
  "tslint"
];

const OUTPUT_DIR = "output";

const printAvaliableExtensions = () => {
  console.log(
    EXTENSIONS.map((extension, index) => {
      return `[${index}] ${extension}`;
    }).join("\n")
  );
};

const getConfiguration = async () => {
  const currentExtensions: string[] = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  printAvaliableExtensions();
  console.log(`Current extensions: ${currentExtensions}`);
  let response = await promptAsync(rl, "Choose an extension to add: ");
  while (response) {
    currentExtensions.push(EXTENSIONS[parseInt(response, 10)]);
    console.log(`Current extensions: ${currentExtensions}`);
    response = await promptAsync(rl, "Choose an extension to add: ");
  }

  rl.close();
  return currentExtensions;
};

const main = async () => {
  const extensions = await getConfiguration(); // OR ["startupScript", "javascript"]
  const starterPack = new StarterPack();
  for (const extension of extensions) {
    await starterPack.registerExtension(`../extensions/${extension}`);
  }
  await starterPack.apply(OUTPUT_DIR);
  console.log(`Wrote project to ${OUTPUT_DIR}`);
};

main();
