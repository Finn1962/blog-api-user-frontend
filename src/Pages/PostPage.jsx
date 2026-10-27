import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageWrapper from "../Components/PageWrapper";
import RenderPostContent from "../Components/RenderPostContent";

function PostPage() {
  const [post, setPost] = useState(null);
  console.log(typeof post?.content);

  const { id } = useParams();

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
          <PageWrapper className="px-0 pt-15 mb-6">
            <img
              src={post.image_url}
              className="w-full sm:max-h-125 max-h-100 max-w-5xl object-cover"
            />
          </PageWrapper>
          <PageWrapper className="mb-14">
            <div className="w-full max-w-5xl flex flex-col gap-15">
              <h2 className="font-heading text-4xl md:text-5xl break-words">
                {post.title}
              </h2>
              <div className="content-container">
                <RenderPostContent htmlContent={post.content} />
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
