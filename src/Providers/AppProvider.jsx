import { ProfileProvider } from "../Contexts/ProfileContext.jsx";
import { CommentFormProvider } from "../Contexts/CommentFormContext.jsx";

function AppProvider({ children }) {
  return (
    <CommentFormProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </CommentFormProvider>
  );
}

export default AppProvider;
