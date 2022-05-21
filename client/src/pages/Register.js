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
           <input name="name" placeholder="Unique Username" />
         </label>
         <label>
           <p>Email:</p>
           <input email="email" placeholder="Enter Email" />
         </label>
         <label>
           <p>Password:</p>
           <input id="psw" type="password" minlength="8" placeholder="Enter Password" name="psw" required/>
           <p className="pswcrit">*Password must contain letters and numbers and be a minimum of 8 characters</p>
         </label>
       
       <button type="submit">Submit</button>
       </fieldset>
      </form>
    </div>
      );
    }
    
    export default Register;