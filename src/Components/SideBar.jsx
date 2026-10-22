import { useScroll } from "../hooks/useScroll";

function SideBar({ className }) {
  const { scrollDirection } = useScroll();

  return (
    <aside
      className={`${scrollDirection === "up" ? "top-20" : "top-5"} transition-all duration-300 ease-out flex flex-col gap-3 bg-base-200 
      w-full ps-6 pe-6 pt-3 pb-3 h-screen sticky  ${className}`}
    >
      <fieldset className="fieldset">
        <label className="input w-full bg-base-100 ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" placeholder="Search" />
        </label>
      </fieldset>

      <div className=" flex flex-wrap justify-start items-start gap-1">
        <button className="btn ">Javascript</button>
        <button className="btn ">HTML</button>
        <button className="btn ">CSS</button>
        <button className="btn">Python</button>
        <button className="btn ">React</button>
        <button className="btn ">Node.js</button>
        <button className="btn">Express</button>
        <button className="btn ">Tailwind</button>
        <button className="btn ">DasyUI</button>
        <button className="btn ">SQL</button>
        <button className="btn ">Editors</button>
      </div>

      <div className=" flex flex-wrap justify-start items-start gap-1"></div>
    </aside>
  );
}

export default SideBar;
