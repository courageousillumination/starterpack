import StarterPackFile from "../../core/file/file";
import Context from "../../core/context";

class JavascriptContext {
  private devDependencies: string[] = [];

  getConfigOptions() {
    const deps: { [index: string]: string } = {};
    for (const x of this.devDependencies) {
      deps[x] = "*";
    }
    return {
      devDependencies: JSON.stringify(deps)
    };
  }

  addDevDependency(dependency: string) {
    this.devDependencies.push(dependency);
  }
}

const main = async (context: Context) => {
  const packageJson = await StarterPackFile.createFileFromTemplate(
    "package.json",
    "src/plugins/javascript/templates/package.json.mustache"
  );
  context.addFile(packageJson);
  context.addFile(new StarterPackFile("index.js", ""));
  context.registerConfigOption({
    name: "projectName",
    prompt: "What is your project name? "
  });

  context.registerPluginContext("javascript", new JavascriptContext());
};
export default main;
