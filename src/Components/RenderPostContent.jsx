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

  const cleanedHtml = htmlContent
    ? htmlContent.replace(
        /(<pre[\s\S]*?<\/pre>)|(&nbsp;|\u00A0)/gi,
        (match, preBlock) => {
          return preBlock ? preBlock : " ";
        },
      )
    : "";

  const options = {
    replace: (domNode) => {
      if (domNode.name === "pre") {
        // Falls im Editor <code> innerhalb von <pre> liegt, wird beides sauber ausgelesen
        const codeNode =
          domNode.children?.find((child) => child.name === "code") ||
          domNode.children?.[0];
        const codeText = codeNode?.children?.[0]?.data || codeNode?.data || "";
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

  return (
    <div className="clean-running-text" lang="de">
      {parse(cleanedHtml, options)}
    </div>
  );
}

export default RenderPostContent;
