import { Extension } from "../core/extensions";
import { JavascriptContext } from "./javascript";
import Writer from "../core/writer";
import ProjectConfiguration from "../core/project-config";
import { WebpackContext } from "./webpack";
import Context from "../core/context";

const typescriptAndWebpack = (ctx: WebpackContext, globalCtx: Context) => {
  const javascriptContext: JavascriptContext = globalCtx.getExtensionContext(
    "javascript"
  );

  javascriptContext.addDependency("ts-loader");
  ctx.addResolveExtension(".ts");
  ctx.addModuleRule({
    test: ".ts",
    use: "ts-loader",
    exclude: "node_modules"
  });
};

class TypescriptExtension extends Extension {
  public extensionId: string = "typescript";
  crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => ctx.addDependency("typescript"),
    webpack: typescriptAndWebpack
  };

  public writeFiles(writer: Writer, config: ProjectConfiguration) {
    const tsconfig = {
      compilerOptions: {
        target: "es5",
        module: "commonjs",
        lib: ["es2017"],
        outDir: "./build",
        strict: true,
        esModuleInterop: true,
        downlevelIteration: true
      }
    };
    writer.writeFile("tsconfig.json", JSON.stringify(tsconfig, undefined, 2));
  }
}

export default new TypescriptExtension();
