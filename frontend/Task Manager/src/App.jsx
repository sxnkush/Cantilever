import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./Home";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //To avoid flashing of Home on visiting url even if user is not looged in
  useEffect(() => {
    const token = localStorage.getItem("uid");    //if i get token form localStorage then it implies that user if logged in and Home can be rendered, until this check, Loading.. will appear
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated? <Home />: <Navigate to="/login"/>} />
      </Routes>
    </Router>
  );
}

export default App;
