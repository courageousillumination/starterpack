import { Extension } from "./extensions";
import Configuration from "./config";
import Writer from "./writer";
import Context from "./context";

class StarterPack {
  private extensions: Extension[] = [];

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
  private async fillConfig(): Promise<Configuration> {
    const config = new Configuration();
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
