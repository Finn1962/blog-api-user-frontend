import { ProfileProvider } from "../Contexts/ProfileContext.jsx";

function AppProvider({ children }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}

export default AppProvider;
