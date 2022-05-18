import { Link } from "react-router-dom";
import React from 'react';
import './styles/style.css';


function NavBar() {
  return (
    
    <nav className="nav navbar">
        <ul className="nav navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
            <li>
            <Link to="/login">Log-In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        
    
        </ul>
      </nav>
     
    
  );
}

export default NavBar;
