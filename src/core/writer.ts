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

  public writeFile(fileName: string, content: string, permisisons?: string) {
    const location = path.join(this.baseLocation, fileName);

    // Check for the directory first
    const directory = path.dirname(location);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    this.outstandingWrites.push(
      fs.promises.writeFile(location, content).then(() => {
        if (permisisons) {
          return fs.promises.chmod(location, permisisons);
        }
      })
    );
  }

  /** Returns a promise that resolves when all files are written.  */
  public allFilesWritten() {
    return Promise.all(this.outstandingWrites);
  }
}

export default Writer;
