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
import { getToken } from "./util/security";

function App() {
  const [selectedTheme, setSelectedTheme] = useState("emerald");
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = getToken();
    const payload = token
      ? JSON.parse(atob(token.split(".")[1])).payload
      : null;
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
          <Navi setSelectedTheme={setSelectedTheme} user={user} />
        </nav>

        <main className="navmargin">
          {
            // ADMIN: All routes available
            user.is_admin ? (
              <>
                <Routes>
                  {/* Users Routing */}
                  <Route path="/" element={<Dashboard user={user} />} />{" "}
                  {/* change to admin dashboard in future w/ settings for user dashboard */}
                  <Route path="*" element={<LandingError />} />
                  <Route path="/admin/users" element={<AllUsers />} />
                  <Route path="/user/:userId" element={<UserProfileIndiv />} />
                  {/* Boards Routing */}
                  <Route path="/board/:boardId" element={<MoosageLanding />} />
                  {/* Moosages Routing */}
                </Routes>
              </>
            ) : // LOGGED-IN USER: All public routes + editing routes available
            user.email ? (
              <>
                <Routes>
                  {/* Users Routing */}
                  <Route path="/" element={<Dashboard user={user} />} />
                  <Route path="/user/:userId" element={<UserProfileIndiv />} />
                  <Route path="*" element={<LandingError />} />
                  {/* Boards Routing */}
                  <Route path="/board/:boardId" element={<MoosageLanding />} />
                  {/* Moosages Routing */}
                </Routes>
              </>
            ) : (
              // NON-LOGGED-IN USERS: Only public routes available
              <>
                <Routes>
                  {/* Users Routing */}
                  <Route
                    path="/"
                    element={<LoginSignUp setLogin={setLogin} />}
                  />
                  <Route path="*" element={<LandingError />} />
                  {/* Boards Routing */}

                  {/* Moosages Routing */}
                </Routes>
              </>
            )
          }
        </main>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
