import { Extension } from "../core/extensions";
import { JavascriptContext } from "./javascript";

class TslintExtension extends Extension {
  public extensionId: string = "tslint";
  protected crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => ctx.addDependency("tslint")
  };
}

export default new TslintExtension();
