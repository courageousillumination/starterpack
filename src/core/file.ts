import * as fs from "fs";
import * as path from "path";

class File {
  private name: string;
  private content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }

  public append(content: string) {
    this.content += content;
  }

  public write(dir: string) {
    fs.writeFile(path.join(dir, this.name), this.content, err => {
      if (err) console.log(err);
    });
  }
}

export default File;
