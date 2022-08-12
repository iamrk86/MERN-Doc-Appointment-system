import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import "./App.css";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading && (
        <div className="loader">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
