import { Link } from "react-router-dom";
import React from 'react';
//import './styles/style.css';
//import LogIn from "../pages/LogIn";

import Auth from "../utils/auth";
import { LogIn } from "../pages";
import { Register } from "../pages";
import { Nav } from "../App.css";


function NavBar() {
  return (
    
    <Nav className="nav navbar">
        <NavBar className="nav navbar">
          
            <Link as={Link} to="/">Home</Link>
            <Link as={Link} to="/search">Search</Link>
          {}
          {Auth.loggedIn() ? (
              <>
              <Link as={Link} to="/AddGame">Add-Game</Link>
              <Link as={Link} to="/Profile">Profile</Link>
              <Link onClick={Auth.logout}>Logout</Link>
              </>
              ) : (
                <Link onClick={() => LogIn(true)}>Login</Link>
              )  (
                <Link onClick={() => Register(true)}>Register</Link>
              )} 
            <Link to="/login">Log-In</Link>
            <Link to="/register">Register</Link>
        </NavBar>
      </Nav>
     
    
  );
}

export default NavBar;
