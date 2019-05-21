import { promises } from "fs";
import { join } from "path";

class StarterPackFile {
  private name: string;
  private content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }

  public static async createFileFromTemplate(
    fileName: string,
    path: string
  ): Promise<StarterPackFile> {
    const buffer = await promises.readFile(path, "utf8");
    return new StarterPackFile(fileName, buffer);
  }

  public write(location: string): Promise<void> {
    return promises.writeFile(join(location, this.name), this.content);
  }
}

export default StarterPackFile;
