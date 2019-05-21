import Configuration, { ConfigOption } from "./config";
import Writer from "./writer";
import Context from "./context";

export interface Extension {
  extensionId: string;

  /**
   * Registers this extension with the context.
   * The extension may want to speak to other extensions at this step.
   */
  register?: (context: Context) => void;

  /**
   * Gets all configuration options associated with this extension.
   */
  getConfigOptions?: () => ConfigOption[];

  /**
   * Writes all files for this extension.
   */
  writeFiles?: (writer: Writer, configuration: Configuration) => void;
}
