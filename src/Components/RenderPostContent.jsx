import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import parse from "html-react-parser";

function RenderPostContent({ htmlContent }) {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "pre") {
        const codeText = domNode.children[0]?.data || "";
        return (
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            showLineNumbers
            wrapLongLines
          >
            {codeText}
          </SyntaxHighlighter>
        );
      }
    },
  };

  return <div>{parse(htmlContent ? htmlContent : "", options)}</div>;
}

export default RenderPostContent;
