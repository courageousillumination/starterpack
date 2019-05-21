import { Extension } from "./extensions";
import readline from "readline";

export interface ConfigOption {
  name: string;
  prompt?: string;
  value?: any;
}

const promptAsync = async (
  rl: readline.Interface,
  prompt: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    rl.question(prompt, answer => resolve(answer));
  });
};

class Configuration {
  private options: Map<string, ConfigOption> = new Map<string, ConfigOption>();

  public addConfigurationOption(option: ConfigOption) {
    this.options.set(option.name, option);
  }

  public getOptionValue(optionName: string): any {
    const option = this.options.get(optionName);
    return option !== undefined ? option.value : undefined;
  }

  public setOptionValue(optionName: string, value: any) {
    const option = this.options.get(optionName);
    if (option) {
      option.value = value;
    }
  }

  /**
   * Fill out any configuration options that require user prompts.
   */
  public async getUserInput() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    for (const option of this.options.values()) {
      if (option.prompt) {
        const value = await promptAsync(rl, option.prompt);
        this.setOptionValue(option.name, value);
      }
    }

    rl.close();
  }
}

export default Configuration;
