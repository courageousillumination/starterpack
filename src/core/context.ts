import * as fs from "fs";

import File from "./file";

class Context {
  private files: File[];
  private pythonRequirements?: File;
  constructor() {
    this.files = [];
    this.pythonRequirements = null;
  }
  /**
   * Adds a file to the root of this context.
   * @param file
   */
  public addFile(file: File) {
    this.files.push(file);
  }

  /**
   * Adds a python dependency.
   * @param requirement
   */
  public addPythonRequirement(requirement: string) {
    if (!this.pythonRequirements) {
      this.pythonRequirements = new File("requirements.txt", "");
    }

    this.pythonRequirements.append(requirement);
  }

  /**
   * Writes this context to a given directory.
   * @param dir
   */
  public write(dir: string) {
    this.files.map(file => {
      file.write(dir);
    });

    if (this.pythonRequirements) {
      this.pythonRequirements.write(dir);
    }
  }
}

export default Context;
