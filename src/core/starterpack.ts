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
   *
   * The steps in this function are as follows:
   * 1) Register all extensions. This ensures that the context has all
   *    appropriate extension contexts.
   * 2) Apply any cross extension steps.
   * 3) Fill the configuration.
   * 4) Write files.
   *
   * @param location
   */
  public async apply(location: string) {
    const context = new Context();

    for (const extension of this.extensions) {
      extension.register(context);
    }

    for (const extension of this.extensions) {
      extension.applyCrossExtensionSteps(context);
    }

    const config = await this.fillConfig();
    const writer = new Writer(location);
    await writer.initalize();
    for (const extension of this.extensions) {
      extension.writeFiles(writer, config);
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
