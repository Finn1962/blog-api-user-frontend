import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(false);

function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);

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
