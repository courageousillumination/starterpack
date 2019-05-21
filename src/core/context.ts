import StarterPackFile from "./file/file";
import { promises } from "fs";
import readline from "readline";

interface ConfigOption {
  name: string;
  prompt?: string;
}

const promptAsync = async (
  rl: readline.Interface,
  prompt: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    rl.question(prompt, answer => resolve(answer));
  });
};

class Context {
  private files: StarterPackFile[] = [];
  private options: ConfigOption[] = [];

  public registerConfigOption(configOption: ConfigOption) {
    this.options.push(configOption);
  }

  public addFile(file: StarterPackFile) {
    this.files.push(file);
  }

  public async write(location: string) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Fill in all of the options
    const configuration: { [index: string]: string } = {};
    for (const configOption of this.options) {
      if (configOption.prompt) {
        configuration[configOption.name] = await promptAsync(
          rl,
          configOption.prompt
        );
      }
    }

    await promises.mkdir(location, { recursive: true });

    for (const file of this.files) {
      await file.write(location, configuration);
    }

    rl.close();
  }
}

export default Context;
