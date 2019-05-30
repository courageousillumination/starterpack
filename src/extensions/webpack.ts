import { Extension } from "../core/extensions";
import Writer from "../core/writer";
import { JavascriptContext } from "./javascript";

export class WebpackContext {
  private resolveExtensions: string[] = [".js"];
  private moduleRules: any[] = [];

  addResolveExtension(extension: string) {
    this.resolveExtensions.push(extension);
  }

  addModuleRule(rule: any) {
    this.moduleRules.push(rule);
  }

  getResolveExtensions(): string[] {
    return this.resolveExtensions;
  }

  getModuleRules(): any[] {
    return this.moduleRules;
  }
}

class WebpackExtension extends Extension {
  public extensionId: string = "webpack";

  protected context: WebpackContext;
  protected crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => {
      ctx.addDependency("webpack");
      ctx.addDependency("webpack-cli");
      ctx.addDependency("webpack-dev-server");
      ctx.addScript("run-dev-server", "webpack-dev-server --open");
    }
  };

  constructor() {
    super();
    this.context = new WebpackContext();
  }

  public writeFiles(writer: Writer) {
    writer.writeFile("webpack.config.js", this.generateWebpackConfig());
  }

  private generateWebpackConfig(): string {
    const config: any = {
      entry: "./src/index.jsx",
      output: {
        filename: "bundle.js"
      },
      module: {
        rules: this.context.getModuleRules()
      },
      resolve: {
        extensions: this.context.getResolveExtensions()
      }
    };

    return `module.exports = ${JSON.stringify(config, undefined, 2)};`;
  }
}

export default new WebpackExtension();
