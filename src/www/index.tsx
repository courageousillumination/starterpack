import React from "react";
import ReactDOM from "react-dom";
import ExtensionSelector from "./components/extension-selector";

const App = () => {
  const extensionNames = ["javascript"];
  return <ExtensionSelector extensions={extensionNames} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
