import { Extension } from "../core/extensions";
import Writer from "../core/writer";
import ProjectConfiguration from "../core/project-config";
import { StartupScriptContext } from "./startup-script";

export class GitContext {
  private gitIgnorePatterns: string[] = [];

  addGitIgnorePattern(pattern: string) {
    this.gitIgnorePatterns.push(pattern);
  }

  getGitIgnorePatterns() {
    return this.gitIgnorePatterns;
  }
}

class GitExtension extends Extension {
  public extensionId: string = "git";

  protected context: GitContext;
  protected crossExtensionSteps = {
    "startup-script": (ctx: StartupScriptContext) =>
      ctx.addStartupCommand("git init")
  };

  constructor() {
    super();
    this.context = new GitContext();
  }

  public writeFiles(writer: Writer, config: ProjectConfiguration) {
    writer.writeFile(
      ".gitignore",
      this.context.getGitIgnorePatterns().join("\n")
    );
  }
}

export default new GitExtension();
