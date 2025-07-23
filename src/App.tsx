import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./features/auth/ProtectedRoutes";
import { useAppSelector } from "./app/hooks";
import { useGetUserQuery } from "./app/api/eshopApi";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { ToastContainer } from "react-toastify";

function AppContent() {
  const token = useAppSelector((state) => state.auth.token);
  const { isLoading } = useGetUserQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
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
