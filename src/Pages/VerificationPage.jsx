import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";

function VerificationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const { token } = useParams();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/register/${token}`);
        const result = await response.json();
        if (result.message === "Authorization successful") return setErrors([]);
        setErrors(result.errors);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <PageWrapper className="flex flex-col !justify-center items-center gap-3 h-screen">
      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {!isLoading && errors?.length === 0 ? (
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
