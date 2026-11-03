import { useProfile } from "../Contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useCommentForm } from "../Contexts/CommentFormContext";

function Comment({ comment }) {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { setIsCommentFormVisible, setIsResponseComment, setRepliedCommentId } =
    useCommentForm();

  return (
    <div className="w-full bg-base-100 px-6 py-4 flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          {comment.author.profile_image_url ? (
            <img
              alt="Tailwind CSS Navbar component object-cover"
              src={comment.author.profile_image_url}
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
        </div>
        <h3 className="font-heading text-lg">{comment.author.username}</h3>
      </div>

      <p className="text-sm">{comment.content}</p>
      <div className="flex gap-2 w-full flex justify-between">
        <button
          className="btn btn-square"
          onClick={() => {
            !profile ? navigate("/login") : setIsCommentFormVisible(true);
            setIsResponseComment(true);
            setRepliedCommentId(comment.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chat-dots"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
          </svg>
        </button>
        <div className="flex gap-2 items-center justify-center">
          <p>0</p>
          <button
            className="btn btn-circle"
            onClick={() => {
              !profile ? navigate("/login") : null;
            }}
          >
            <svg
              aria-label="Like"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-[1.2em]"
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
    </div>
  );
}

export default Comment;
