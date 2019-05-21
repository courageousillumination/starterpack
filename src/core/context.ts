import StarterPackFile from "./file/file";
import { promises } from "fs";

class Context {
  private files: StarterPackFile[] = [];
  public addFile(file: StarterPackFile) {
    this.files.push(file);
  }

  public async write(location: string) {
    await promises.mkdir(location, { recursive: true });

    for (const file of this.files) {
      await file.write(location);
    }
  }
}

export default Context;
