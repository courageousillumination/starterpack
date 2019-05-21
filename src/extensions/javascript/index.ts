import { Extension } from "../../core/extensions";
import Writer from "../../core/writer";
import Configuration from "../../core/config";
import Context from "../../core/context";

export class JavascriptContext {
  private devDependencies: { [index: string]: string } = {};

  addDevDependency(dependency: string, version?: string) {
    this.devDependencies[dependency] = version ? version : "*";
  }

  getDevDependencies() {
    return this.devDependencies;
  }
}

class JavascriptExtension implements Extension {
  public extensionId: string = "javascript";
  private context: JavascriptContext;

  constructor() {
    this.context = new JavascriptContext();
  }

  public register(context: Context) {
    context.addExtensionContext(this.extensionId, this.context);
  }

  public getConfigOptions() {
    return [
      {
        name: "projectName",
        // prompt: "What is your project name? "
        value: "testing"
      }
    ];
  }

  public writeFiles(writer: Writer, config: Configuration) {
    writer.writeFile(
      "package.json",
      JSON.stringify(this.buildPackageJson(config), undefined, 4)
    );
  }

  private buildPackageJson(config: Configuration) {
    const packageJson: { [index: string]: any } = {
      name: config.getOptionValue("projectName")
    };
    if (this.context.getDevDependencies()) {
      packageJson["devDependencies"] = this.context.getDevDependencies();
    }
    return packageJson;
  }
}

export default new JavascriptExtension();
