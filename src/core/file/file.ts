import { promises } from "fs";
import { join } from "path";
import Mustache from "mustache";

class StarterPackFile {
  private name: string;
  private content: string;
  private useTemplate: boolean;

  constructor(name: string, content: string, useTemplate: boolean = false) {
    this.name = name;
    this.content = content;
    this.useTemplate = useTemplate;
  }

  public static async createFileFromTemplate(
    fileName: string,
    path: string
  ): Promise<StarterPackFile> {
    const buffer = await promises.readFile(path, "utf8");
    return new StarterPackFile(fileName, buffer, true);
  }

  public write(location: string, configuration: any): Promise<void> {
    const content = this.useTemplate
      ? Mustache.render(this.content, configuration)
      : this.content;
    console.log(content);
    return promises.writeFile(join(location, this.name), content);
  }
}

export default StarterPackFile;
