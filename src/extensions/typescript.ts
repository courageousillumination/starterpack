import { Extension } from "../core/extensions";
import { JavascriptContext } from "./javascript";
import Writer from "../core/writer";
import ProjectConfiguration from "../core/project-config";

class TypescriptExtension extends Extension {
  public extensionId: string = "typescript";
  crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => ctx.addDevDependency("typescript")
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
