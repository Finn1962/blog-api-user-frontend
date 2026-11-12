const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";

function NewPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  async function sendNewPassword() {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}register/reset-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordValue,
          confirmPassword: confirmPasswordValue,
          token,
        }),
      });
      const result = await response.json();
      if (result?.errors) setErrors(result.errors);
      if (result.message === "Password successfully saved") navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageWrapper>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold max-w-sm">
              Enter your new Password
            </h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset flex flex-col gap-2">
                {errors.some((error) => error.msg === "Invalid token") && (
                  <p className="text-error text-xl font-semibold">
                    Useraccount not found
                  </p>
                )}
                {errors.some((error) => error.msg === "Token has expired") && (
                  <p className="text-error text-xl font-semibold">
                    Your reset expired
                  </p>
                )}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input bg-base-200 w-full"
                  placeholder="************"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                />
                {errors.some(
                  (error) => error.msg === "Password is required",
                ) && (
                  <p className="text-error font-semibold">
                    Password is required
                  </p>
                )}
                {errors.some(
                  (error) =>
                    error.msg ===
                    "Password must be between 8 and 32 characters",
                ) && (
                  <p className="text-error font-semibold">
                    Password must be between 8 and 32 characters
                  </p>
                )}
                <label className="label">Confirm password</label>
                <input
                  type="password"
                  className="input bg-base-200 w-full"
                  placeholder="************"
                  value={confirmPasswordValue}
                  onChange={(event) =>
                    setConfirmPasswordValue(event.target.value)
                  }
                />
                {errors.some((error) => error.msg === "Confirm password") && (
                  <p className="text-error font-semibold">Confirm password</p>
                )}
                {errors.some(
                  (error) => error.msg === "Passwords must match",
                ) && (
                  <p className="text-error font-semibold">
                    Passwords must match
                  </p>
                )}
                <button
                  className="btn btn-primary mt-2"
                  onClick={sendNewPassword}
                >
                  {!isLoading ? (
                    "Save new password"
                  ) : (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default NewPasswordPage;
