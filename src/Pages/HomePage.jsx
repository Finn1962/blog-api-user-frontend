import { useEffect, useState } from "react";

import backgroundImage from "../assets/background.svg";

import PageWrapper from "../Components/pageWrapper";
import PostPreview from "../Components/PostPreview";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/post");
      const result = await response.json();
      console.log(result.posts);
      setPosts(result.posts);
    })();
  }, []);

  return (
    <PageWrapper>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            alt="Tailwind CSS hero component"
            src={backgroundImage}
            className="max-w-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <hr className="border-base-100" />
      <div className="w-full">
        {posts.map((post) => {
          return <PostPreview post={post} key={post.id} />;
        })}
      </div>
    </PageWrapper>
  );
}

export default HomePage;
