import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../ThemeContext';
import "./Navi.css";
import { logoutUser } from "../../service/users";

function Navi({ setSelectedTheme, user }) {
  const selectedTheme = useContext(ThemeContext);

  const handleThemeChange = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setSelectedTheme(theme);
  };

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <img src="/movingcowemoji.png" width="50" height="50" />
          <Link to="/" className="btn btn-ghost text-xl hachi-maru text-2xl">Moosage</Link>
        </div>

        <div className="flex-none gap-2">
          Welcome, {user.preferredName}!
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
              <button
                onClick={async () => {
                  await logoutUser();
                  window.location.reload();
                }}
              >
                Logout
              </button>
              </li>
            </ul>
          </div>
          {/* Theme Dropdown */}
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Theme</summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
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
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navi;
