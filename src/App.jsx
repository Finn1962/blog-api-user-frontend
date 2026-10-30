import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppProvider from "../src/Providers/AppProvider.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import PostPage from "./Pages/PostPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import VerificationPage from "./Pages/VerificationPage.jsx";
import Menu from "./Components/Menu.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="h-full min-h-screen bg-base-300 flex flex-col justify-between items-center">
          <Menu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verification/:token" element={<VerificationPage />} />
          </Routes>
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
