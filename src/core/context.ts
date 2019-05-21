class Context {
  private extensionContexts: Map<string, any> = new Map();

  public addExtensionContext(extensionId: string, context: any) {
    this.extensionContexts.set(extensionId, context);
  }

  public getExtensionContext(extensionId: string) {
    return this.extensionContexts.get(extensionId);
  }
}

export default Context;
