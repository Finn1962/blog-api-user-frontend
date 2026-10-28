import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <footer className="footer footer-horizontal footer-center bg-base-200 border-t border-base-100 text-base-content rounded p-10 gap-5 font-heading">
          <h3 className="font-bold opacity-80">
            Take a look at my Git repositories:
          </h3>
          <nav>
            <div className="flex flex-col gap-3">
              <a
                className="flex justify-center items-center gap-3 hover:opacity-80 no-underline transition-all"
                href="https://github.com/Finn1962/blog-api-user-frontend"
                rel="noopener noreferrer"
                target="_blank"
              >
                User Frontend
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-display-fill w-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 12q0 1-.25 1.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-.75Q10 13 10 12h4c2 0 2-2 2-2V4c0-2-2-2-2-2H2C0 2 0 4 0 4v6c0 2 2 2 2 2z" />
                </svg>
              </a>
              <a
                className="flex justify-center items-center gap-3 hover:opacity-80 no-underline transition-all "
                href="https://github.com/Finn1962/blog-api-author-frontend"
                rel="noopener noreferrer"
                target="_blank"
              >
                Author Frontend
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-display-fill w-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 12q0 1-.25 1.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-.75Q10 13 10 12h4c2 0 2-2 2-2V4c0-2-2-2-2-2H2C0 2 0 4 0 4v6c0 2 2 2 2 2z" />
                </svg>
              </a>
              <a
                className="flex justify-center items-center gap-3 hover:opacity-80 no-underline transition-all "
                href="https://github.com/Finn1962/blog-api-author-frontend"
                rel="noopener noreferrer"
                target="_blank"
              >
                Backend
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-hdd-rack-fill w-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v2H2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1V7h1a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-2 7a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1M12 7v2H4V7z" />
                </svg>
              </a>
            </div>
          </nav>
          <aside>
            <p className="opacity-80">
              Copyright © {new Date().getFullYear()} - Made by Finn Schmidt
            </p>
          </aside>
        </footer>
      )}
    </>
  );
}

export default Footer;
