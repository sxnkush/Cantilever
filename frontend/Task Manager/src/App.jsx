import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./Home";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
        });
        if (res.status === 200) setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false); // 401 or other error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
