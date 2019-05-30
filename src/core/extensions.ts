import ProjectConfiguration, { ConfigOption } from "./project-config";
import Writer from "./writer";
import Context from "./context";

export abstract class Extension {
  abstract extensionId: string;

  /**
   * Stores a map of extensionId to steps functions.
   * The step function is given the context for the other extension.
   */
  protected crossExtensionSteps: {
    [index: string]: (ctx: any, globalContext: Context) => void;
  } = {};

  /**
   * If this extension wants to expose a context to other extensions it should be included here.
   */
  protected context: any = null;

  /**
   * Registers this extension with the context.
   * The extension may want to speak to other extensions at this step.
   */
  public register(context: Context) {
    if (this.context) {
      context.addExtensionContext(this.extensionId, this.context);
    }
  }

  /**
   * Gets all configuration options associated with this extension.
   */
  public getConfigOptions(): ConfigOption[] {
    return [];
  }

  /**
   * Writes all files for this extension.
   */
  public writeFiles(writer: Writer, configuration: ProjectConfiguration) {}

  /**
   * Applies all steps that are required when two extensions interact.
   */
  applyCrossExtensionSteps(globalContext: Context) {
    for (const key of Object.keys(this.crossExtensionSteps)) {
      const context = globalContext.getExtensionContext(key);
      if (context) {
        this.crossExtensionSteps[key](context, globalContext);
      }
    }
  }
}
