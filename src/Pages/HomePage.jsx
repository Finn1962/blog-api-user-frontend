import { useEffect, useState } from "react";

import { debounce } from "../utils/debounce.js";

import backgroundImage from "../assets/laptop.svg";
import cupImage from "../assets/cup.svg";

import PageWrapper from "../Components/PageWrapper.jsx";
import PostPreview from "../Components/PostPreview.jsx";
import SideBar from "../Components/SideBar.jsx";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPaginationNumber, setCurrentPaginationNumber] = useState(0);
  const [paginationTotalNumber, setPaginationTotalNumber] = useState(0);
  const elementsOnEachSlide = 10;
  const viewHeight = window.innerHeight;

  useEffect(() => {
    debounce(async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/post?searchValue=${searchValue}
          &skip=${currentPaginationNumber * elementsOnEachSlide}&take=${elementsOnEachSlide}`,
        );
        const result = await response.json();
        setPaginationTotalNumber(
          Math.ceil(result.totalPostsNumber / elementsOnEachSlide),
        );
        setPosts(result.posts);
      } catch (error) {
        console.error(error);
      }
    });
  }, [searchValue, currentPaginationNumber]);

  function scrollDown() {
    window.scrollBy({
      top: viewHeight,
      behavior: "smooth",
    });
  }

  return (
    <PageWrapper>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            alt="Tailwind CSS hero component"
            src={backgroundImage}
            className="xl:max-w-4xl max-w-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold font-heading">.codersBlog</h1>
            <p className="py-6 font-light">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              className="btn btn-primary font-heading"
              onClick={scrollDown}
            >
              Let's go
            </button>
          </div>
        </div>
      </div>

      <SideBar
        className="col-start-4 col-end-5 lg:hidden block mb-3"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="grid grid-cols-4 gap-5">
        {posts.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5 w-full col-start-1 lg:col-end-4 col-end-5">
            {posts.map((post) => (
              <PostPreview post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <div className="h-90 col-start-1 lg:col-end-4 col-end-5 flex lg:flex-row-reverse flex-col justify-center items-center lg:gap-8">
            <img src={cupImage} className="h-full lg:mb-5" />
            <h3 className="font-bold text-xl font-heading">
              Oh! No reusults found.
            </h3>
          </div>
        )}
        <SideBar
          className="col-start-4 col-end-5 lg:flex hidden"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>

      <div className="join mt-10 mb-5">
        {new Array(paginationTotalNumber).fill(0).map((_, index) => (
          <button
            className={`join-item btn ${currentPaginationNumber === index && "btn-primary"}`}
            key={index}
            onClick={() => {
              setCurrentPaginationNumber(index);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </PageWrapper>
  );
}

export default HomePage;
