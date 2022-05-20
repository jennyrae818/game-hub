import React from 'react';
//import './styles/style.css';



function Register() {
  return (
    <div className="register">
    <h2>Register Here!</h2>
      <form>
      <fieldset>
         <label>
           <p>Username:</p>
           <input name="name" />
         </label>
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
    
    export default Register;