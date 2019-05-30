import { Extension } from "../core/extensions";
import { JavascriptContext } from "./javascript";
import { WebpackContext } from "./webpack";
import { BabelContext } from "./babel";
import Context from "../core/context";

const REACT_SAMPLE =
  "const ReactDOM = require('react-dom')\n" +
  "ReactDOM.render(\n" +
  "  <h1>Hello, world!</h1>,\n" +
  "  document.getElementById('root')\n" +
  ");\n";

const webpackAndReact = (ctx: WebpackContext, globalCtx: Context) => {
  // Probably move babel elsewhere?
  const javascript = globalCtx.getExtensionContext("javascript");

  javascript.addDependency("babel-loader");
  javascript.addDependency("@babel/preset-react");

  ctx.addResolveExtension(".jsx");
  ctx.addModuleRule({
    // test: ".jsx",
    // exclude: "node_modules",
    use: "babel-loader"
  });
};

class ReactExtension extends Extension {
  public extensionId: string = "react";
  protected crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => {
      ctx.addDependency("react", false);
      ctx.addDependency("react-dom", false);
      ctx.addIndexContent(REACT_SAMPLE);
    },
    webpack: webpackAndReact,
    babel: (ctx: BabelContext) => ctx.addPreset("@babel/preset-react")
  };
}

export default new ReactExtension();
