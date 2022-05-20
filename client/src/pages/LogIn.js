import React from 'react';
//import './styles/style.css';



function LogIn() {
  return (
    <div className="login">
    <h2>Welcome Back!</h2>
      <form>
      <fieldset>
         <label>
           <p>Email:</p>
           <input email="email" />
         </label>
         <label>
           <p>Password:</p>
           <input pwd="pwd" />
         </label>
       
       <button type="submit">Submit</button>
       </fieldset>
      </form>
    </div>
    
      );
    }
    
    export default LogIn;