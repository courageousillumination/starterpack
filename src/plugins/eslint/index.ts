import Context from "../../core/context";

const main = async (context: Context) => {
  const javascriptContext = context.getPluginContext("javascript");
  javascriptContext.addDevDependency("eslint");
};
export default main;
