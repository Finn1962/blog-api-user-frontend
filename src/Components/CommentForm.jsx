import { useState } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { useCommentForm } from "../Contexts/CommentFormContext";

function CommentForm({ postId, fetchComments }) {
  const [commentValue, setCommentValue] = useState("");
  const [errors, setErrors] = useState([]);
  const { authFetch } = useAuthFetch();
  const { setIsCommentFormVisible, isResponseComment, repliedCommentId } =
    useCommentForm();

  async function uploadComment() {
    await authFetch({
      url: "http://localhost:3000/comment",
      method: "POST",
      body: {
        content: commentValue,
        postId,
        isResponse: isResponseComment,
        repliedCommentId,
        commentId: repliedCommentId,
      },
      callback: (response) => {
        if (response?.errors.length > 0) return setErrors(response.errors);
        fetchComments();
        setIsCommentFormVisible(false);
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <>
      <div className="bg-base-100 w-full max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-3">
        <fieldset className="fieldset flex flex-col gap-1">
          <div className="flex justify-between items-center min-h-13">
            <legend className="fieldset-legend font-heading pt-0 text-lg">
              {isResponseComment ? "Type your response!" : "Type your comment!"}
            </legend>
            <button
              className="btn btn-circle self-start"
              onClick={() => setIsCommentFormVisible(false)}
            >
              ✕
            </button>
          </div>
          <textarea
            className="textarea h-24 bg-base-200 w-full"
            placeholder={
              isResponseComment
                ? "I completely agree with you!"
                : "Beatiful post!"
            }
            value={commentValue}
            onChange={(event) => setCommentValue(event.target.value)}
          ></textarea>

          {errors.some((error) => error.msg === "Content is required") && (
            <p className="text-error font-semibold">Comment cannot be empty.</p>
          )}
          <button
            className="btn btn-primary mt-3 w-full"
            onClick={async () => uploadComment()}
          >
            Post comment
          </button>
        </fieldset>
      </div>
      <div className="bg-base-200 fixed top-0 left-0 bottom-0 right-0 z-5 opacity-30"></div>
    </>
  );
}

export default CommentForm;
