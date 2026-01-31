import { BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import LoginPage from "./components/pages/Login";
import Dashboard from ".pages/Dashboard";

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
