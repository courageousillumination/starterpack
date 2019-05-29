import { Extension } from "../core/extensions";
import Writer from "../core/writer";
import ProjectConfiguration from "../core/project-config";
import Context from "../core/context";
import { StartupScriptContext } from "./startup-script";
import { GitContext } from "./git";

export class JavascriptContext {
  private devDependencies: { [index: string]: string } = {};

  addDevDependency(dependency: string, version?: string) {
    this.devDependencies[dependency] = version ? version : "*";
  }

  getDevDependencies() {
    return this.devDependencies;
  }
}

class JavascriptExtension extends Extension {
  public extensionId: string = "javascript";

  protected context: JavascriptContext;
  protected crossExtensionSteps = {
    git: (ctx: GitContext) => ctx.addGitIgnorePattern("node_modules"),
    "startup-script": (ctx: StartupScriptContext) =>
      ctx.addStartupCommand("npm install")
  };

  constructor() {
    super();
    this.context = new JavascriptContext();
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

  public writeFiles(writer: Writer, config: ProjectConfiguration) {
    writer.writeFile(
      "package.json",
      JSON.stringify(this.buildPackageJson(config), undefined, 4)
    );
  }

  private buildPackageJson(config: ProjectConfiguration) {
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