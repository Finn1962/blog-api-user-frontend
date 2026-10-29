import { useNavigate } from "react-router";

function useAuthFetch() {
  const navigate = useNavigate();

  async function authFetch({
    url,
    method = "GET",
    body = null,
    setLoadingTrue = () => {},
    setLoadingFalse = () => {},
    callback = () => {},
    stringifyBody = true,
    errorLocation = "/login",
  }) {
    try {
      const hasBody =
        method === "POST" || method === "PUT" || method === "PATCH";

      setLoadingTrue();

      let response = await fetch(url, {
        method,
        credentials: "include",
        body: hasBody ? (stringifyBody ? JSON.stringify(body) : body) : null,
      });

      if (response.status === 401) {
        const refreshResponse = await fetch(
          "http://localhost:3000/login/refresh",
          { credentials: "include" },
        );
        if (refreshResponse.status === 401) {
          return errorLocation && navigate(errorLocation);
        }
        response = await fetch(url, {
          method,
          credentials: "include",
          body: hasBody ? (stringifyBody ? JSON.stringify(body) : body) : null,
        });
      }

      const result = await response.json();

      callback(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFalse();
    }
  }

  return { authFetch };
}

export { useAuthFetch };
