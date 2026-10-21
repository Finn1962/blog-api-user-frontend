import { useState, useEffect } from "react";

function Menu() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;

    function handleScroll() {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        setIsVisible(false);
      } else if (currentScroll < lastScrollTop) {
        setIsVisible(true);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }

    window.addEventListener("scroll", handleScroll, false);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`navbar bg-base-100 shadow-sm fixed z-100 ${isVisible ? "slide-down" : "slide-up"}`}
      >
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">codersBlog</a>
        </div>
        <div className="flex gap-4">
          <div>
            <button className="btn btn-ghost ">Login</button>
            <button className="btn btn-ghost">Register</button>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
