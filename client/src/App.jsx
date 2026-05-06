import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;