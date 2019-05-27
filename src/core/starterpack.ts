import { Extension } from "./extensions";
import ProjectConfiguration from "./project-config";
import Writer from "./writer";
import Context from "./context";
import { StarterPackConfig } from "./starterpack-config";

class StarterPack {
  private extensions: Extension[] = [];

  public static async createFromConfig(
    config: StarterPackConfig
  ): Promise<StarterPack> {
    const starterPack = new StarterPack();
    for (const extension of config.extensions) {
      await starterPack.registerExtension(`../extensions/${extension}`);
    }
    return starterPack;
  }

  public getFullConfig(): StarterPackConfig {
    return {
      extensions: this.getExtensions().map(ex => ex.extensionId)
    };
  }

  public async registerExtension(extension: string) {
    const extensionModule = await import(extension);
    const coreExtension = extensionModule.default as Extension;
    this.extensions.push(coreExtension);
  }

  /** Gets all extensions currently attached to this context. */
  public getExtensions(): Extension[] {
    return this.extensions;
  }

  /**
   * Applies the starter pack to the given location.
   * This will inovke all extensions on the given location and ultimately
   * prepare the location for the new project.
   * @param location
   */
  public async apply(location: string) {
    const context = new Context();

    for (const extension of this.extensions) {
      if (extension.register) {
        extension.register(context);
      }
    }

    const config = await this.fillConfig();
    const writer = new Writer(location);
    await writer.initalize();
    for (const extension of this.extensions) {
      if (extension.writeFiles) {
        extension.writeFiles(writer, config);
      }
    }

    await writer.allFilesWritten();
  }

  /** Fills the configuration based on all the extensions. */
  private async fillConfig(): Promise<ProjectConfiguration> {
    const config = new ProjectConfiguration();
    for (const extension of this.extensions) {
      if (extension.getConfigOptions) {
        const options = extension.getConfigOptions();
        for (const option of options) {
          config.addConfigurationOption(option);
        }
      }
    }

    await config.getUserInput();
    return config;
  }
}
export default StarterPack;
