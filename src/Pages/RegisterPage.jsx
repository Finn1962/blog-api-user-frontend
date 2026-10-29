import { useState } from "react";
import PageWrapper from "../Components/PageWrapper";

function RegisterPage() {
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [errors, setErrors] = useState([]);
  console.log(errors);

  async function fetchData() {
    const response = await fetch("http://localhost:3000/register", {
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
      }),
    });
    const result = await response.json();
    setErrors(result.errors);
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
              <fieldset className="fieldset flex flex-col gap-2">
                <label className="label">Username</label>
                <input
                  type="email"
                  className="input bg-base-200 w-full"
                  placeholder="John Doe"
                  value={usernameValue}
                  onChange={(event) => setUsernameValue(event.target.value)}
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
                />
                {errors.some(
                  (error) => error.msg === "Passwords must match",
                ) && (
                  <p className="text-error font-semibold">
                    Passwords do not match{" "}
                  </p>
                )}
                <button className="btn btn-primary mt-2" onClick={fetchData}>
                  Create account
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
