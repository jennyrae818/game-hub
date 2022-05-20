import { Link } from "react-router-dom";
import React from 'react';
//import './styles/style.css';
//import LogIn from "../pages/LogIn";

import Auth from "../utils/auth";
import LogIn from "../pages/LogIn";


function NavBar() {
  return (
    
    <nav className="nav navbar">
        <ul className="nav navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link as={Link} to="/search">Search</Link>
          </li>
          {Auth.loggedIn() ? (
              <>
              <Link as={Link} to="/AddGame"></Link>
              <Link as={Link} to="/Profile"></Link>
              <Link onClick={Auth.logout}>Logout</Link>
              </>
              ) : (
                <Link onClick={() => LogIn(true)}
              )} 
           /*  <li>
            <Link to="/login">Log-In</Link>
          </li> */
          <li>
            <Link to="/register">Register</Link>
          </li>
        
    
        </ul>
      </nav>
     
    
  );
}

export default NavBar;
