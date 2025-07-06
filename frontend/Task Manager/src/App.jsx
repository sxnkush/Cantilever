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
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [authenticated, setAuthenticated] = useState(false);
  // Here we need to checck whether user is logged in or not since it is directly rendering Home until Mongoose is connected, so we need to first check whther user is loogged In or not, but also fetch request is going to take time till it connects to mongoose, so we need to set authenticated as false by default so that it directly renders the login page
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
        });
        if (res.data.message === "not found") {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch (err) {
        console.log("Error in Fetching User", err);
      }
    };
    fetchUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={authenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
