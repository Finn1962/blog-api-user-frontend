import { createContext, useContext, useState } from "react";

const CommentFormContext = createContext(false);

function CommentFormProvider({ children }) {
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(null);
  const [isResponseComment, setIsResponseComment] = useState(false);
  const [repliedCommentId, setRepliedCommentId] = useState(0);

  return (
    <CommentFormContext.Provider
      value={{
        isCommentFormVisible,
        setIsCommentFormVisible,
        isResponseComment,
        setIsResponseComment,
        repliedCommentId,
        setRepliedCommentId,
      }}
    >
      {children}
    </CommentFormContext.Provider>
  );
}

function useCommentForm() {
  const context = useContext(CommentFormContext);

  if (!context) {
    throw new Error("useCommentForm must be used within a LoaderProvider");
  }

  return context;
}

export { CommentFormProvider, useCommentForm }; // eslint-disable-line
