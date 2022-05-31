import { Link } from "react-router-dom";
import React from "react";

import Auth from "../utils/auth";

function NavBar() {
  const reloadPage = () => {
    window.location.replace("/");
  }

  return (
    <nav className="nav navbar">
      <ul>
        <li>
          <Link to="/" onClick={reloadPage}>Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        {/* IF USER IS LOGGED-IN SHOW NEW OPTIONS */}
        {Auth.loggedIn() ? (
          <>
            <li>
              <Link to="/addgame">Add-Game</Link>
            </li>
            <li>
              <Link to="/profile">View-Profile</Link>
            </li>
            <li>
              <Link onClick={Auth.logout} to="/">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Log-In</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default NavBar;
