import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage.jsx";
import Menu from "./Components/Menu.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="h-full min-h-screen bg-base-300">
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
