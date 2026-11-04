import PageWrapper from "../Components/PageWrapper.jsx";

function ResetPasswordPage() {
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
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input bg-base-200 w-full"
                  placeholder="john.doe@example.com"
                />
                <button className="btn btn-primary mt-2">Send email</button>
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
