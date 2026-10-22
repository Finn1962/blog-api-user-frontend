import { useEffect, useState } from "react";

import backgroundImage from "../assets/background-two.svg";

import PageWrapper from "../Components/PageWrapper.jsx";
import PostPreview from "../Components/PostPreview.jsx";
import SideBar from "../Components/SideBar.jsx";

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

      <div className="grid grid-cols-4 gap-5">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5 w-full col-start-1 col-end-4">
          {posts.map((post) => (
            <PostPreview post={post} key={post.id} />
          ))}
        </div>
        <SideBar className="col-start-4 col-end-5" />
      </div>
    </PageWrapper>
  );
}

export default HomePage;
