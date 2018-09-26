import Context from "../../core/context";
import File from "../../core/file";

const configure = (context: Context) => {
  context.addPythonRequirement("pylint");
  context.addFile(new File("pylintrc", "some pylint stuff"));
};

export default configure;
