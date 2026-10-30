import { useState } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../Contexts/ProfileContext";
import { Link } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";

function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  console.log(error);

  const navigate = useNavigate();
  const { authFetch } = useAuthFetch();
  const { setProfile } = useProfile();

  async function sendLoginRequest() {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });
      const result = await response.json();
      if (result.message === "Login failed") setError(result.errors[0]);
      if (result.message === "Login successful") {
        await authFetch({
          url: "http://localhost:3000/profile",
          callback: (result) => {
            setProfile(result.userData);
          },
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <PageWrapper className="!justify-center h-screen">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 lg:max-w-full max-w-sm">
              A user account offers you many advantages. You can post public
              comments, and others can reply to you.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset flex flex-col gap-2">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input bg-base-200 w-full"
                  placeholder="john.doe@example.com"
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input bg-base-200 w-full"
                  placeholder="************"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => sendLoginRequest()}
                >
                  Login
                </button>
                {error !== "" && (
                  <p className="text-error font-bold mt-1">{error}</p>
                )}
                <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-0 sm:gap-2 mt-2">
                  <a className="link link-hover opacity-70 hover:opacity-100 transition-all ">
                    Forgot your password
                  </a>
                  <span>or</span>
                  <Link
                    to="/register"
                    className="link link-hover opacity-70 hover:opacity-100 transition-all "
                  >
                    Don't have an account?
                  </Link>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Login;
