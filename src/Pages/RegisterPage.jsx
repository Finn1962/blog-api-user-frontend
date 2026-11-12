const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import PageWrapper from "../Components/PageWrapper";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [sendNotificationValue, setSendNotificationValue] = useState(false);
  const [errors, setErrors] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      setRegistrationSuccess(false);
      const response = await fetch(`${apiUrl}register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          confirmPassword: confirmPasswordValue,
          sendEmailNotification: sendNotificationValue,
        }),
      });
      const result = await response.json();
      if (result.message === "Registration successful") {
        setRegistrationSuccess(true);
        setErrors([]);
        setUsernameValue("");
        setEmailValue("");
        setPasswordValue("");
        setConfirmPasswordValue("");
        return;
      }
      setErrors(result.errors);
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
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6 lg:max-w-full max-w-sm">
              A user account offers you many advantages. You can post public
              comments, and others can reply to you.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              {registrationSuccess && (
                <p className="text-success font-semibold">
                  Registration successful! You will receive a confirmation email
                  shortly.
                </p>
              )}
              <fieldset className="fieldset flex flex-col gap-2">
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input bg-base-200 w-full"
                  placeholder="John Doe"
                  value={usernameValue}
                  onChange={(event) => setUsernameValue(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && fetchData()}
                />
                {errors.some(
                  (error) => error.msg === "Username is already taken",
                ) && (
                  <p className="text-error font-semibold">
                    Username is already taken
                  </p>
                )}
                {errors.some(
                  (error) => error.msg === "Username is required",
                ) && (
                  <p className="text-error font-semibold">
                    Username is required
                  </p>
                )}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input bg-base-200 w-full"
                  placeholder="john.doe@example.com"
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && fetchData()}
                />
                {errors.some(
                  (error) => error.msg === "Email is already taken",
                ) && (
                  <p className="text-error font-semibold">
                    Email is already taken
                  </p>
                )}
                {errors.some((error) => error.msg === "Email is required") && (
                  <p className="text-error font-semibold">Email is required</p>
                )}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input bg-base-200 w-full"
                  placeholder="************"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && fetchData()}
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
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  className="input bg-base-200 w-full"
                  placeholder="************"
                  value={confirmPasswordValue}
                  onChange={(event) =>
                    setConfirmPasswordValue(event.target.value)
                  }
                  onKeyDown={(event) => event.key === "Enter" && fetchData()}
                />
                {errors.some(
                  (error) => error.msg === "Passwords must match",
                ) && (
                  <p className="text-error font-semibold">
                    Passwords do not match{" "}
                  </p>
                )}
                <label className="label">
                  Receive notification emails about new posts
                </label>
                <label className="toggle text-base-content bg-base-200">
                  <input
                    type="checkbox"
                    checked={sendNotificationValue}
                    onChange={(event) =>
                      setSendNotificationValue(event.target.checked)
                    }
                  />
                  <svg
                    aria-label="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <svg
                    aria-label="enabled"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="4"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </g>
                  </svg>
                </label>
                <button className="btn btn-primary mt-2" onClick={fetchData}>
                  {!isLoading ? (
                    "Create account"
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

export default RegisterPage;
