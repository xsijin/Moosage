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
  const [newPname, setNewPname] = useState(null);

  useEffect(() => {
    const token = getToken();
    const payload = token
      ? JSON.parse(atob(token.split(".")[1])).payload
      : null;
    // console.log("payload", payload);
    if (payload && payload.email) {
      // console.log("payload set");
      setUser(payload);
    }
  }, [login]);

  console.log("newPname in App", newPname);

  return (
    <>
      <ThemeContext.Provider value={selectedTheme}>
        <nav>
          <Navi
            setSelectedTheme={setSelectedTheme}
            user={user}
            newPname={newPname}
          />
        </nav>

        <main className="navmargin">
          {
            // ADMIN: All routes available
            user.is_admin ? (
              <>
                <Routes>
                  {/* Users Routing */}
                  <Route path="/" element={<Dashboard user={user} newPname={newPname} />} /> {/* change to admin dashboard in future w/ settings for user dashboard */}
                  <Route path="*" element={<LandingError />} />
                  <Route path="/admin/users" element={<AllUsers loggedUser={user} setNewPname={setNewPname} />} />
                  <Route path="/user/:userId" element={<UserProfileIndiv loggedUser={user} setNewPname={setNewPname} />} />
                  {/* Boards Routing */}
                  {/* Moosages Routing */}
                  <Route path="/board/:boardId" element={<MoosageLanding user={user} newPname={newPname} />} />
                </Routes>
              </>
            ) : // LOGGED-IN USER: All public routes + editing routes available
            user.email ? (
              <>
                <Routes>
                  {/* Users Routing */}
                  <Route path="/" element={<Dashboard user={user} newPname={newPname} />} />
                  <Route path="*" element={<LandingError />} />
                  <Route path="/user/:userId" element={ <UserProfileIndiv loggedUser={user} setNewPname={setNewPname} />} />
                  {/* Boards Routing */}
                  {/* Moosages Routing */}
                  <Route path="/board/:boardId" element={<MoosageLanding user={user} newPname={newPname} />} /> {/* Private Routing */}
                </Routes>
              </>
            ) : (
              // NON-LOGGED-IN USERS: Only public routes available
              <>
                <Routes>
                  {/* Users Routing */}
                  <Route path="/" element={<LoginSignUp setLogin={setLogin} />} />
                  <Route path="*" element={<LandingError />} />
                  {/* Boards Routing */}

                  {/* Moosages Routing */}
                </Routes>
              </>
            )
          }
        </main>

        <footer className="footer footer-center bg-base-100 text-base-content rounded-full footerstyle text-xs">
          <aside>
            <p>
              Copyright © 2024 -{" "}
              <a href="https://github.com/xsijin/Moosage" target="_blank">
                Moosage
              </a>
            </p>
          </aside>
        </footer>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
