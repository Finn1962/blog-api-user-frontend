import { useState } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";

function CommentForm({ setIsOpen, postId, authorId, fetchComments }) {
  const [commentValue, setCommentValue] = useState("");

  const { authFetch } = useAuthFetch();

  async function uploadComment() {
    await authFetch({
      url: "http://localhost:3000/comment",
      method: "POST",
      body: { content: commentValue, postId, authorId },
      callback: (response) => {
        console.log(response);
      },
    });
  }

  return (
    <>
      <div className="bg-base-100 w-full max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-3">
        <fieldset className="fieldset flex flex-col gap-1">
          <div className="flex justify-between items-center min-h-13">
            <legend className="fieldset-legend font-heading pt-0 text-lg">
              Type your comment!
            </legend>
            <button
              className="btn btn-circle self-start"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <textarea
            className="textarea h-24 bg-base-200 w-full"
            placeholder="Beatiful post!"
            value={commentValue}
            onChange={(event) => setCommentValue(event.target.value)}
          ></textarea>
          <button
            className="btn btn-primary mt-3 w-full"
            onClick={async () => {
              await uploadComment();
              fetchComments();
              setIsOpen(false);
            }}
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
