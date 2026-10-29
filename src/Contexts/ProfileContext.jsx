import { createContext, useContext, useState, useEffect } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";

const ProfileContext = createContext(false);

function ProfileProvider({ children }) {
  const { authFetch } = useAuthFetch();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    authFetch({
      url: "http://localhost:3000/profile",
      errorLocation: null,
      callback: (result) => {
        setProfile(result.userData);
      },
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a LoaderProvider");
  }

  return context;
}

export { ProfileProvider, useProfile }; // eslint-disable-line
