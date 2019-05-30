import { Extension } from "../core/extensions";
import { JavascriptContext } from "./javascript";
import Writer from "../core/writer";

export class BabelContext {
  private presets: string[] = [];
  addPreset(preset: string) {
    this.presets.push(preset);
    // TODO: This should notify javascript as well.
  }

  getPresets() {
    return this.presets;
  }
}

class BabelExtension extends Extension {
  public extensionId: string = "babel";
  protected context: BabelContext;

  constructor() {
    super();
    this.context = new BabelContext();
  }

  protected crossExtensionSteps = {
    javascript: (ctx: JavascriptContext) => ctx.addDependency("@babel/core")
  };

  public writeFiles(writer: Writer) {
    writer.writeFile(
      ".babelrc",
      JSON.stringify(
        {
          presets: this.context.getPresets()
        },
        undefined,
        2
      )
    );
  }
}

export default new BabelExtension();
