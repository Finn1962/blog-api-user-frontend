import { Link } from "react-router-dom";

function PostPreview({ post }) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="card bg-base-100 shadow-sm break-inside-avoid hover:scale-95 transition ease-in-out"
    >
      {post?.image_url ? (
        <figure>
          <img
            src={post.image_url}
            alt="Shoes"
            className="h-auto w-full object-cover max-h-100"
          />
        </figure>
      ) : (
        <div className="bg-accent p-5 h-65">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="h-full w-full object-cover opacity-20 bi bi-image invert"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
          </svg>
        </div>
      )}
      <div className="card-body flex justify-between flex-col gap-3">
        <h2 className="card-title font-heading">{post?.title}</h2>

        <div>
          <div className="flex gap-2 justify-start items-start flex-wrap mb-1">
            {post?.tags.length >= 1 &&
              post.tags.map((tag) => {
                return <Tag tag={tag} key={tag.id} />;
              })}
          </div>
        </div>
      </div>
    </Link>
  );
}

function Tag({ tag }) {
  return <span className="badge badge-primary">{tag.content}</span>;
}

export default PostPreview;
