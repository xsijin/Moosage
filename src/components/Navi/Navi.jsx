import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../ThemeContext";
import "./Navi.css";
import { logoutUser } from "../../service/users";

function Navi({ setSelectedTheme, user, newPname }) {
  const selectedTheme = useContext(ThemeContext);

  const handleThemeChange = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setSelectedTheme(theme);
  };

  return (
    <>
      <div className="navbar bg-base-100 rounded-full stayfixed">
        <div className="flex-1">
          <img src="/movingcowemoji.png" width="50" height="50" />
          <Link
            to="/"
            className="btn btn-ghost text-xl hachi-maru text-2xl text-base-content"
          >
            Moosage
          </Link>
        </div>

        <div className="flex-none gap-2 text-base-content">
          {user.userId ? (
            `Welcome, ${newPname ? newPname : user.preferredName}!`
          ) : (
            <>
              Welcome,{" "}
              <Link to="/" className="hover:text-primary">
                join us.
              </Link>
            </>
          )}
          {Object.keys(user).length > 0 && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-28"
              >
                <li>
                  <Link to={`/user/${user.userId}`}>Profile</Link>
                </li>
                {user.is_admin && (
                  <>
                    <li>
                      <a>Admin</a>
                    </li>
                    <li>
                      <Link to={`/`}>Dashboard</Link>
                    </li>
                  </>
                )}
                <li>
                  <button
                    onClick={async () => {
                      await logoutUser();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* Theme Dropdown */}

          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-xs bg-base-100">
              Vibin' in {selectedTheme} 🌈
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24"
            >
              {["light", "winter", "emerald", "forest", "night"].map(
                (theme) => (
                  <li key={theme}>
                    <input
                      type="radio"
                      name="theme-dropdown"
                      className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                      aria-label={theme}
                      value={theme}
                      checked={selectedTheme === theme}
                      onChange={() => handleThemeChange(theme)}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navi;
