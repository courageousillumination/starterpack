import Context from "./context";

const runPlugin = async (context: Context, pluginName: string) => {
  const plugin = await import(`../plugins/${pluginName}`);
  await plugin.default(context);
};

export { runPlugin };
