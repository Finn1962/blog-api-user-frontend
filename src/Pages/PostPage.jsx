const apiUrl = import.meta.env.VITE_API_URL;
import cupImage from "../assets/cup.svg";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProfile } from "../Contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useCommentForm } from "../Contexts/CommentFormContext";
import PageWrapper from "../Components/PageWrapper";
import RenderPostContent from "../Components/RenderPostContent";
import Tag from "../Components/Tag";
import Comment from "../Components/Comment";
import CommentForm from "../Components/CommentForm";

function PostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const pathname = window.location.pathname;
  const queryParams = window.location.search;
  const { profile } = useProfile();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("isPreview") === "true";
  const navigate = useNavigate();
  const {
    isCommentFormVisible,
    setIsCommentFormVisible,
    setIsResponseComment,
  } = useCommentForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    (async () => {
      setIsLoading(true);
      try {
        const url = isPreview
          ? `${apiUrl}post/${id}?isPreview=${isPreview}`
          : `${apiUrl}post/${id}`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        if (result.message === "No authorization")
          navigate(`/login?redirect=${pathname + queryParams}`);
        setPost(result.post);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      fetchComments();
    })();
  }, []);

  useEffect(() => {
    if (!post?.image_url) return;
    setImageIsLoading(true); // eslint-disable-line
    fetch(post.image_url)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      })
      .catch((error) => console.error(error))
      .finally(() => setImageIsLoading(false));

    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [post?.image_url]);

  async function fetchComments() {
    try {
      const response = await fetch(`${apiUrl}comment/${id}`);
      const result = await response.json();
      setComments(result.comments);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoading && <Skeleton />}
      {post && (
        <>
          {isCommentFormVisible && (
            <CommentForm postId={post.id} fetchComments={fetchComments} />
          )}

          <PageWrapper className="px-0 pt-15 mb-3">
            {!imageIsLoading ? (
              imageSrc ? (
                <img
                  src={imageSrc}
                  className="w-full sm:max-h-125 max-h-100 max-w-5xl object-cover"
                />
              ) : (
                <div className="bg-accent p-5 sm:h-125 h-100 max-w-5xl w-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="h-full opacity-20 bi bi-image invert"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                  </svg>
                </div>
              )
            ) : (
              <div className="skeleton h-125 w-full max-w-5xl"></div>
            )}
          </PageWrapper>
          <PageWrapper className="mb-14">
            <div className="w-full max-w-5xl flex flex-col gap-10">
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => {
                  return <Tag tag={tag} key={tag.id} />;
                })}
              </div>
              <h2 className="font-heading text-4xl md:text-5xl break-words">
                {post.title}
              </h2>
              <div className="content-container">
                <RenderPostContent
                  htmlContent={post.content}
                  usedLanguage={post.prog_lang}
                />
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex sm:flex-row flex-col justify-between gap-3">
                  <h2 className="font-heading text-3xl break-words self-start mb-0">
                    Comments
                  </h2>
                  <button
                    className="btn btn-primary font-heading"
                    onClick={() => {
                      if (isPreview) return;
                      !profile
                        ? navigate("/login")
                        : setIsCommentFormVisible(true);
                      setIsResponseComment(false);
                    }}
                  >
                    Add Comment
                  </button>
                </div>
                {!isPreview &&
                  comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                  ))}

                {isPreview ||
                  (comments.length === 0 && (
                    <div className="w-full flex sm:flex-row flex-col gap-3 justify-center items-center">
                      <p className="font-heading">Write the first comment!</p>
                      <img src={cupImage} className="max-w-15" />
                    </div>
                  ))}
              </div>
            </div>
          </PageWrapper>
        </>
      )}
    </>
  );
}

function Skeleton() {
  return (
    <PageWrapper className="px-0 pt-15 mb-3">
      <div className="w-full max-w-5xl h-screen flex flex-col justify-start gap-5 items-center">
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-100 w-full"></div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton w-full h-4 "></div>
          <div className="skeleton w-5/6 h-4 "></div>
          <div className="skeleton w-3/4 h-4 "></div>
          <div className="skeleton w-5/6 h-4 "></div>
          <div className="skeleton w-full h-4 mb-5"></div>
          <div className="skeleton w-full h-4 "></div>
          <div className="skeleton w-5/6 h-4 "></div>
          <div className="skeleton w-full h-4 "></div>
          <div className="skeleton w-1/2 h-4"></div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default PostPage;
