import { useScroll } from "../hooks/useScroll.js";
import { Link } from "react-router-dom";
import { useProfile } from "../Contexts/ProfileContext.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../hooks/useAuthFetch.js";

function Menu() {
  const { profile, setProfile } = useProfile();
  const { scrollDirection } = useScroll();
  const navigate = useNavigate();
  const { authFetch } = useAuthFetch();

  function logout() {
    authFetch({ url: "http://localhost:3000/logout" });
    setProfile(null);
  }

  return (
    <div
      className={`navbar bg-base-100 shadow-sm fixed top-0 z-100 ${scrollDirection === "up" ? "slide-down" : "slide-up"}`}
    >
      <div className="navbar-start">
        <div className="dropdown sm:hidden block">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
        <div className="sm:block hidden">
          {profile ? (
            <a
              onClick={() => {
                navigate("/");
                logout();
              }}
              className="btn btn-ghost font-heading"
            >
              Logout
            </a>
          ) : (
            <Link to="/login" className="btn btn-ghost font-heading">
              Login
            </Link>
          )}
          {!profile && (
            <Link to="/register" className="btn btn-ghost font-heading">
              Register
            </Link>
          )}
        </div>
      </div>
      <div className="navbar-center">
        <Link to={"/"} className="btn btn-ghost text-xl font-heading">
          .codersBlog
        </Link>
      </div>
      <div className="navbar-end">
        <div
          className="dropdown dropdown-end cursor-pointer"
          onClick={() => (profile ? navigate("/profile") : navigate("/login"))}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full flex justify-center items-center">
              {profile ? (
                <img
                  alt="Tailwind CSS Navbar component"
                  src={profile.profile_image_url}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-person-fill w-3/5"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
