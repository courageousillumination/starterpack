import { Extension } from "../../core/extensions";
import Writer from "../../core/writer";
import Configuration from "../../core/config";
import Context from "../../core/context";

export class StartupScriptContext {
  private commands: string[] = [];

  public addStartupCommand(command: string) {
    this.commands.push(command);
  }

  public getStartupCommands() {
    return this.commands;
  }
}

class StartupScriptExtension implements Extension {
  public extensionId: string = "startupScript";
  private context: StartupScriptContext;

  constructor() {
    this.context = new StartupScriptContext();
  }

  public register(context: Context) {
    context.addExtensionContext(this.extensionId, this.context);
  }

  public writeFiles(writer: Writer, config: Configuration) {
    const commands = this.context.getStartupCommands();
    if (commands.length) {
      commands.push("rm startup.sh");
      writer.writeFile("startup.sh", commands.join("\n"), "755");
    }
  }
}

export default new StartupScriptExtension();
