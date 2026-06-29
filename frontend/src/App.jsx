import "./index.css";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/useAuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="h-screen bg-yellow-100">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/chat" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/chat" /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
