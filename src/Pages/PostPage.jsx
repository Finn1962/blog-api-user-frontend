import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageWrapper from "../Components/PageWrapper";
import RenderPostContent from "../Components/RenderPostContent";
import Tag from "../Components/Tag";

function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/post/${id}`);
        const result = await response.json();
        setPost(result.post);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {!post && <Skeleton />}
      {post && (
        <>
          <PageWrapper className="px-0 pt-15 mb-3">
            {post.image_url ? (
              <img
                src={post.image_url}
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
            )}
          </PageWrapper>
          <PageWrapper className="mb-14">
            <div className="w-full max-w-5xl flex flex-col gap-10">
              <div className="flex gap-3">
                {post.tags.map((tag) => {
                  return <Tag tag={tag} />;
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
            </div>
          </PageWrapper>
        </>
      )}
    </>
  );
}

function Skeleton() {
  return (
    <div className="w-full h-screen flex flex-col justify-start gap-5 items-center">
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-150 w-full"></div>
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
  );
}

export default PostPage;
