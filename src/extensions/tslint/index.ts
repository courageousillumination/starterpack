import Context from "../../core/context";
import { Extension } from "../../core/extensions";
import { JavascriptContext } from "../javascript";

class TslintExtension implements Extension {
  public extensionId: string = "tslint";

  public register(context: Context) {
    const javascriptContext = context.getExtensionContext(
      "javascript"
    ) as JavascriptContext;
    javascriptContext.addDevDependency("tslint");
  }
}

export default new TslintExtension();
