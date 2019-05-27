import React from "react";
interface ExtensionSelectorProps {
  extensions: string[];
}

const ExtensionSelector: React.FunctionComponent<ExtensionSelectorProps> = ({
  extensions
}) => {
  const extensionSelectors = extensions.map((extension, i) => {
    return (
      <div key={i}>
        <input type="checkbox" />
        {extension}
      </div>
    );
  });
  console.log(extensionSelectors);
  return <div>{extensionSelectors}</div>;
};

export default ExtensionSelector;
