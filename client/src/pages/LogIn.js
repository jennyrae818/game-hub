import React, { useState } from "react";
import ModalB from "../components/ModalB";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function LogIn() {
  //set userFormData state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  //mutation
  const [login] = useMutation(LOGIN_USER);

  //modal state
  const [showB, setShowB] = useState(false);

  //handle form to login
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //handle login
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const user = await login({
        variables: { 
          email: userFormData.email,
          password: userFormData.password
         },
      });

      //give token if user logs in
      const token = user.data.login.token;
      Auth.login(token);

      //show modal
      setShowB(true);

    } catch (err) {
      console.error(err);
    }

    //reset form data
    setUserFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className="login">
    <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Email:</p>
            <input value={userFormData.email} onChange={handleInput} name="email" type="text" placeholder="Enter Email" />
          </label>
          <label>
            <p>Password:</p>
            <input value={userFormData.password} onChange={handleInput} name="password" type="password" placeholder="Enter Password" />
          </label>
          {/* DISABLE BUTTON IF FORM DATA INCOMPLETE */}
          <button disabled={!(userFormData.email && userFormData.password)} type="submit">Submit</button>
        </fieldset>
      </form>
      <ModalB onClose={() => setShowB(false)} show={showB} />
    </div>
    
  );
}  

export default LogIn;