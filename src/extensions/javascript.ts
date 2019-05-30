import { Extension } from "../core/extensions";
import Writer from "../core/writer";
import ProjectConfiguration from "../core/project-config";
import { StartupScriptContext } from "./startup-script";
import { GitContext } from "./git";

export class JavascriptContext {
  private devDependencies: { [index: string]: string } = {};
  private dependencies: { [index: string]: string } = {};
  private scripts: { [index: string]: string } = {};
  private indexContent: string[] = [];

  addDependency(
    dependency: string,
    dev: boolean = true, // Defaults to true since a lot of the things we install are dev tools.
    version: string = "*"
  ) {
    if (dev) {
      this.devDependencies[dependency] = version;
    } else {
      this.dependencies[dependency] = version;
    }
  }

  addScript(name: string, script: string) {
    this.scripts[name] = script;
  }

  addIndexContent(content: string) {
    this.indexContent.push(content);
  }

  getScripts() {
    return this.scripts;
  }

  getDependencies() {
    return this.dependencies;
  }

  getDevDependencies() {
    return this.devDependencies;
  }

  getIndexContent() {
    return this.indexContent;
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
    writer.writeFile(
      "src/index.jsx",
      this.context.getIndexContent().join("\n")
    );
  }

  private buildPackageJson(config: ProjectConfiguration) {
    const packageJson: { [index: string]: any } = {
      name: config.getOptionValue("projectName")
    };
    if (this.context.getDevDependencies()) {
      packageJson["devDependencies"] = this.context.getDevDependencies();
    }

    if (this.context.getDependencies()) {
      packageJson["dependencies"] = this.context.getDependencies();
    }

    if (this.context.getScripts()) {
      packageJson["scripts"] = this.context.getScripts();
    }
    return packageJson;
  }
}

export default new JavascriptExtension();
