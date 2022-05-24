import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';



function Register(props) {

  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  
  //mutation
  const [createUser] = useMutation(CREATE_USER);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
    console.log(createUser);
    try {
      const newUser = await createUser({
        variables: { ...userFormData },
      });

      console.log(newUser);
      const token = newUser.data.createUser.token;
      Auth.login(token);

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
    <>
    <div className="register">
    <h2>Register Here!</h2>
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <p>Username:</p>
           <input onChange={handleInput} name="username" type="username" placeholder="Unique Username" required />
         </label>
         <label>
           <p>Email:</p>
           <input onChange={handleInput} name="email" type="email" placeholder="Enter Email" />
         </label>
         <label>
           <p>Password:</p>
           <input onChange={handleInput} id="psw" name="password" type="password" minLength="8" placeholder="Enter Password" required/>
           <p className="pswcrit">*Password must contain letters and numbers and be a minimum of 8 characters</p>
         </label>
       
       <button type="submit">Submit</button>
       </fieldset>
      </form>
    </div>
    </>
      );
    }
    
    export default Register;