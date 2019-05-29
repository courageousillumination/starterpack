import { Extension } from "../core/extensions";
import Writer from "../core/writer";
import { JavascriptContext } from "./javascript";

export class WebpackContext {}

class WebpackExtension extends Extension {
  public extensionId: string = "webpack";

  protected context: WebpackContext;
  protected crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => {
      ctx.addDevDependency("webpack");
      ctx.addDevDependency("webpack-cli");
      ctx.addDevDependency("webpack-dev-server");
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
    return (
      "const path = require('path');\n" +
      "module.exports = {\n" +
      "  entry: './src/index.js',\n" +
      "  output: {\n" +
      "    filename: 'main.js',\n" +
      "    path: path.resolve(__dirname, 'dist')\n" +
      "  }\n" +
      "};\n"
    );
  }
}

export default new WebpackExtension();
