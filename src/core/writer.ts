import fs from "fs";
import path from "path";

class Writer {
  private baseLocation: string;
  private outstandingWrites: Promise<void>[] = [];

  constructor(baseLocation: string) {
    this.baseLocation = baseLocation;
  }

  public async initalize() {
    await fs.promises.mkdir(this.baseLocation, { recursive: true });
  }

  public writeFile(fileName: string, content: string) {
    this.outstandingWrites.push(
      fs.promises.writeFile(path.join(this.baseLocation, fileName), content)
    );
  }

  /** Returns a promise that resolves when all files are written.  */
  public allFilesWritten() {
    return Promise.all(this.outstandingWrites);
  }
}

export default Writer;
