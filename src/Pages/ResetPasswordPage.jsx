import { useState } from "react";
import PageWrapper from "../Components/PageWrapper";

function ResetPasswordPage() {
  const [successfullySent, setSuccessfullySent] = useState(false);
  const [errors, setErrors] = useState([]);
  const [emailValue, setEmailValue] = useState("");

  async function handleButtonClick() {
    const response = await fetch(
      "http://localhost:3000/register/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
        }),
      },
    );
    const result = await response.json();
    if (result.errors) {
      setErrors(result.errors);
      setSuccessfullySent(false);
    }
    if (result.message === "Email is sent if the email address exists") {
      setErrors([]);
      setSuccessfullySent(true);
    }
  }

  return (
    <PageWrapper>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Reset your <br /> Password
            </h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset flex flex-col gap-2">
                {successfullySent && (
                  <p className="text-success text-lg">
                    Check your email inbox now.
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
                  (error) => error.msg === "Invalid email address",
                ) && (
                  <p className="text-error font-semibold">
                    Invalid email address
                  </p>
                )}
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleButtonClick}
                >
                  Send email
                </button>
              </fieldset>
              <p className="label whitespace-normal">
                If the email address exists, we will send you an email to reset
                your password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ResetPasswordPage;
