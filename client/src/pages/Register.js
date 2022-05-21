import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';



function Register() {

  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  
  //mutation
  const [addUser] = useMutation(ADD_USER)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="register">
    <h2>Register Here!</h2>
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <p>Username:</p>
           <input value={userFormData.username} name="name" placeholder="Unique Username" />
         </label>
         <label>
           <p>Email:</p>
           <input value={userFormData.email} email="email" placeholder="Enter Email" />
         </label>
         <label>
           <p>Password:</p>
           <input value={userFormData.password} id="psw" type="password" minlength="8" placeholder="Enter Password" name="psw" required/>
           <p className="pswcrit">*Password must contain letters and numbers and be a minimum of 8 characters</p>
         </label>
       
       <button type="submit">Submit</button>
       </fieldset>
      </form>
    </div>
      );
    }
    
    export default Register;