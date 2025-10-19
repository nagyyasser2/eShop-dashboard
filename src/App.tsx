import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./features/auth/ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useGetUserQuery } from "./app/api/authApi";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { ToastContainer } from "react-toastify";

function AppContent() {
  const { Token, User } = useAppSelector((state) => state.auth);

  // ✅ Fetch user if token exists but user is null
  const { isLoading } = useGetUserQuery(undefined, {
    skip: !Token || !!User, // Skip if no token OR user already exists
  });

  // ✅ Show loading only when we have a token but are fetching user
  if (Token && !User && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ProtectedRoutes />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
