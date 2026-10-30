import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";

function VerificationPage() {
  const [errors, setErrors] = useState([]);

  const { token } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/register/${token}`);
      const result = await response.json();
      if (result.message === "Authorization successful") return setErrors([]);
      setErrors(result.errors);
    })();
  }, []);

  return (
    <PageWrapper className="flex flex-col !justify-center items-center gap-3 h-screen">
      {errors?.length === 0 ? (
        <h2 className="font-heading">Congratulations, you are verified.</h2>
      ) : (
        <h2 className="font-heading text-xl">Oops, something didn't work.</h2>
      )}
      {errors.some((error) => error.msg === "Invalid token") && (
        <p>Your token is invalid.</p>
      )}
      {errors.some((error) => error.msg === "Token has expired") && (
        <p>Your token is expired.</p>
      )}
    </PageWrapper>
  );
}

export default VerificationPage;
