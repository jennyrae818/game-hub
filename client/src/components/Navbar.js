import { Link } from "react-router-dom";
import React from 'react';

import Auth from '../utils/auth';
//import './styles/style.css';


function NavBar() {
  return (
    
    <nav className="nav navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          {Auth.loggedIn() ? (
            <>
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
