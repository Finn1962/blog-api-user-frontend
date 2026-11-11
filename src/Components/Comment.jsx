const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { useProfile } from "../Contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useCommentForm } from "../Contexts/CommentFormContext";
import { useAuthFetch } from "../hooks/useAuthFetch";

function Comment({ comment }) {
  const navigate = useNavigate();
  const { authFetch } = useAuthFetch();
  const { profile } = useProfile();
  const { setIsCommentFormVisible, setIsResponseComment, setRepliedCommentId } =
    useCommentForm();

  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const [isLiked, setIsLiked] = useState(
    comment.likes.some((like) => like.user_id === profile?.id),
  );

  function addLikeToComment() {
    authFetch({
      url: `${apiUrl}comment/like`,
      method: "POST",
      body: {
        commentId: comment.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
      callback: (result) => {
        if (result.message === "Like added") {
          setIsLiked(() => true);
          setLikesCount((prev) => prev + 1);
        }
      },
    });
  }

  function removeLikeFromComment() {
    authFetch({
      url: `${apiUrl}comment/like/${comment.id}`,
      method: "DELETE",
      callback: (result) => {
        if (result.message === "Like removed") {
          setIsLiked(() => false);
          setLikesCount((prev) => prev - 1);
        }
      },
    });
  }

  return (
    <div className="w-full bg-base-100 px-6 py-4 flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Avatar imageUrl={comment.author.profile_image_url} />
        </div>
        <h3 className="font-heading text-lg">{comment.author.username}</h3>
      </div>

      <p className="text-sm">{comment.content}</p>
      <div className="flex gap-2 w-full flex justify-between">
        <button
          className="btn font-heading"
          onClick={() => {
            if (profile) {
              setIsCommentFormVisible(true);
              setIsResponseComment(true);
              setRepliedCommentId(comment.id);
            } else {
              navigate("/login");
            }
          }}
        >
          Reply
        </button>
        <div className="flex gap-2 items-center justify-center">
          <p>{likesCount}</p>
          <button
            className="btn btn-circle"
            onClick={() => {
              if (profile) {
                if (isLiked) removeLikeFromComment();
                else addLikeToComment();
              } else {
                navigate("/login");
              }
            }}
          >
            <svg
              aria-label="Like"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              className="size-[1.2em]"
              style={{
                fill: isLiked ? "var(--color-error)" : "none",
                stroke: isLiked ? "var(--color-error)" : "currentColor",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
      {comment.responses.map((response) => (
        <Response response={response} key={response.id} />
      ))}
    </div>
  );
}

function Response({ response }) {
  return (
    <div className="w-full bg-base-200 px-6 py-4 flex flex-col gap-3 border-l border-solid border-accent">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Avatar imageUrl={response.author.profile_image_url} />
        </div>
        <h3 className="font-heading text-lg">{response.author.username}</h3>
      </div>
      <p className="text-sm">{response.content}</p>
    </div>
  );
}

function Avatar({ imageUrl }) {
  return (
    <>
      {imageUrl ? (
        <img
          alt="Tailwind CSS Navbar component object-cover"
          src={imageUrl}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="h-full bg-accent p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-person-fill h-full invert opacity-20"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </div>
      )}
    </>
  );
}

export default Comment;
