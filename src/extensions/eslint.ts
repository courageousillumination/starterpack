import { Extension } from "../core/extensions";
import { JavascriptContext } from "./javascript";

class EslintExtension extends Extension {
  public extensionId: string = "eslint";
  protected crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => ctx.addDependency("eslint")
  };
}

export default new EslintExtension();
