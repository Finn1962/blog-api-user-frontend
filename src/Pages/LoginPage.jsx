const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProfile } from "../Contexts/ProfileContext";
import { Link } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [usernameOrEmailValue, setUsernameOrEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { authFetch } = useAuthFetch();
  const { setProfile } = useProfile();

  async function sendLoginRequest() {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: usernameOrEmailValue,
          password: passwordValue,
        }),
      });
      const result = await response.json();
      if (result.message === "Login failed") setError(result.errors[0]);
      if (result.message === "Login successful") {
        await authFetch({
          url: `${apiUrl}profile`,
          callback: (result) => {
            setProfile(result.userData);
          },
        });
        if (redirect) navigate(redirect);
        else navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
                <label className="label">Username or email</label>
                <input
                  type="text"
                  className="input bg-base-200 w-full"
                  placeholder="john.doe@example.com"
                  value={usernameOrEmailValue}
                  onChange={(event) =>
                    setUsernameOrEmailValue(event.target.value)
                  }
                  onKeyDown={(event) =>
                    event.key === "Enter" && sendLoginRequest()
                  }
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input bg-base-200 w-full"
                  placeholder="************"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && sendLoginRequest()
                  }
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => sendLoginRequest()}
                >
                  {!isLoading ? (
                    "Login"
                  ) : (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
                </button>
                {error !== "" && (
                  <p className="text-error font-bold mt-1">{error}</p>
                )}
                <Link
                  to="/register"
                  className="link link-hover opacity-70 hover:opacity-100 transition-all mt-1"
                >
                  Don't have an account?
                </Link>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Login;
