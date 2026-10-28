import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import parse from "html-react-parser";

function RenderPostContent({ htmlContent, usedLanguage }) {
  const languages = {
    JAVA_SCRIPT: "javascript",
    HTML: "html",
    CSS: "css",
    TYPE_SCRIPT: "typescript",
    PYTHON: "python",
    SQL: "sql",
    GO: "go",
    RUBY: "ruby",
    RUST: "rust",
    PHP: "php",
    JAVA: "java",
    C: "c",
    C_PLUS_PLUS: "cpp",
    C_SHARP: "csharp",
  };

  console.log(usedLanguage);

  const options = {
    replace: (domNode) => {
      if (domNode.name === "pre") {
        const codeText = domNode.children[0]?.data || "";
        const cleanedCode = codeText.trim();
        return (
          <SyntaxHighlighter
            language={languages[usedLanguage]}
            style={vscDarkPlus}
            showLineNumbers
            wrapLongLines
            className="syntax-highlighter"
          >
            {cleanedCode}
          </SyntaxHighlighter>
        );
      }
    },
  };

  return <div>{parse(htmlContent ? htmlContent : "", options)}</div>;
}

export default RenderPostContent;
