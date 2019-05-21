import readline from "readline";

const promptAsync = async (
  rl: readline.Interface,
  prompt: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    rl.addListener("close", resolve);
    rl.question(prompt, answer => {
      rl.removeListener("close", resolve);
      resolve(answer);
    });
  });
};

export { promptAsync };
