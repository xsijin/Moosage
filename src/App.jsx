import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import "./App.css";
import Navi from "./components/Navi/Navi";
import Dashboard from "./components/Navi/Dashboard";
import MoosageLanding from "./components/Moosages/MoosagesLanding";
import LandingError from "./components/Moosages/LandingError";
import AllUsers from "./components/Users/AllUsers";
import UserProfileIndiv from "./components/Users/UserProfileIndiv";
import LoginSignUp from "./components/Users/LoginSignUp";
import { getToken } from './util/security';

function App() {
  const [selectedTheme, setSelectedTheme] = useState("emerald");
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = getToken();
    const payload = token ? JSON.parse(atob(token.split(".")[1])).payload : null;
    console.log("payload", payload);
    if (payload && payload.email) {
        console.log("payload set");
        setUser(payload);
    }
  }, [login]);
  
  return (
    <>
      <ThemeContext.Provider value={selectedTheme}>
        <nav>
          <Navi setSelectedTheme={setSelectedTheme} />
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/board/:boardId"
              element={<MoosageLanding />}
            />
            <Route path="*" element={<LandingError />} />
          

          {/* User Routing */}
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/user/:userId" element={<UserProfileIndiv />} />
          <Route
            path="/login-signup"
            element={<LoginSignUp setLogin={setLogin} />} 
          />
          </Routes>
        </main>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
