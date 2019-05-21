import StarterPackFile from "../../core/file/file";
import Context from "../../core/context";

const main = async (context: Context) => {
  const packageJson = await StarterPackFile.createFileFromTemplate(
    "package.json",
    "src/plugins/javascript/templates/package.json"
  );
  context.addFile(packageJson);
  context.addFile(new StarterPackFile("index.js", ""));
};
export default main;
