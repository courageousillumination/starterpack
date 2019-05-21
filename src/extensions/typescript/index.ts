import Context from "../../core/context";
import { Extension } from "../../core/extensions";
import { JavascriptContext } from "../javascript";
import Writer from "../../core/writer";
import Configuration from "../../core/config";

class TypescirptExtension implements Extension {
  public extensionId: string = "typescript";

  public register(context: Context) {
    const javascriptContext = context.getExtensionContext(
      "javascript"
    ) as JavascriptContext;
    javascriptContext.addDevDependency("typescript");
  }

  public writeFiles(writer: Writer, config: Configuration) {
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

export default new TypescirptExtension();
