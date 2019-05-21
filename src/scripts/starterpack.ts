import Context from "../core/context";
import { runPlugin } from "../core/plugins";

const main = async () => {
  const context = new Context();
  await runPlugin(context, "javascript");
  await runPlugin(context, "eslint");
  await context.write("output");
};

main();
