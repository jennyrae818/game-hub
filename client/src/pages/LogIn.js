import React, { useState } from 'react';
//import './styles/style.css';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function LogIn() {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  //mutation
  const [login] = useMutation(LOGIN_USER);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
    console.log(login({...userFormData}));
    try {
      const user = await login({
        variables: { 
          email: userFormData.email,
          password: userFormData.password
         },
      });

      console.log(user);
      const token = user.data.createUser.token;
      Auth.login(token);

    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(userFormData));
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
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
       
       <button disabled={!(userFormData.email && userFormData.password)} type="submit">Submit</button>
       </fieldset>
      </form>
    </div>
    
      );
    }
    
    export default LogIn;