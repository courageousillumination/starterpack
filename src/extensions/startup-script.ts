import { Extension } from "../core/extensions";
import Writer from "../core/writer";
import ProjectConfiguration from "../core/project-config";

export class StartupScriptContext {
  private commands: string[] = [];

  public addStartupCommand(command: string) {
    this.commands.push(command);
  }

  public getStartupCommands() {
    return this.commands;
  }
}

class StartupScriptExtension extends Extension {
  public extensionId: string = "startup-script";
  protected context: StartupScriptContext;

  constructor() {
    super();
    this.context = new StartupScriptContext();
  }

  public writeFiles(writer: Writer, config: ProjectConfiguration) {
    const commands = this.context.getStartupCommands();
    if (commands.length) {
      commands.push("rm startup.sh");
      writer.writeFile("startup.sh", commands.join("\n"), "755");
    }
  }
}

export default new StartupScriptExtension();
