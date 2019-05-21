import Context from "../../core/context";
import { Extension } from "../../core/extensions";
import { JavascriptContext } from "../javascript";

class EslintExtension implements Extension {
  public extensionId: string = "eslint";

  public register(context: Context) {
    const javascriptContext = context.getExtensionContext(
      "javascript"
    ) as JavascriptContext;
    javascriptContext.addDevDependency("eslint");
  }
}

export default new EslintExtension();
