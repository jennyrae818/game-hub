import { Link } from "react-router-dom";
import React from 'react';

//import './styles/style.css';
//import LogIn from "../pages/LogIn";

import Auth from "../utils/auth";
import LogIn from "../pages/LogIn";
//import Register from "../pages/Register";
//import {'.nav '} from "../App.css";


const  NavBar = () => {
  
  return (
    
    <nav className="nav navbar">
        <ul className="nav navbar">
          
            <li><Link as={Link} to="/">Home</Link></li>
            <li><Link as={Link} to="/search">Search</Link></li>
          {}
          {Auth.loggedIn() ? (
              <>
              <li><Link as={Link} to="/AddGame">Add-Game</Link></li>
              <li><Link as={Link} to="/Profile">Profile</Link></li>
              <li><Link onClick={Auth.logout}>Logout</Link></li>
              </>
              ) : (
                <li><Link onClick={() => LogIn(true)}>Login</Link></li>
              ) 
            } 
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Register">Register</Link></li>
        </ul>
      </nav>
     
    
  );
}

export default NavBar;
