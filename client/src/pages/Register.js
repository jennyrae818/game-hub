import React, { useState } from 'react';
<<<<<<< HEAD
=======

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
>>>>>>> 7838f6980b56b26e28477340f8e34d2a9087638c

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
    console.log(createUser({...userFormData}));
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

<<<<<<< HEAD
=======
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

>>>>>>> 7838f6980b56b26e28477340f8e34d2a9087638c
  return (
    <>
    <div className="register">
    <h2>Register Here!</h2>
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <p>Username:</p>
<<<<<<< HEAD
           <input onChange={handleInput} name="username" type="username" placeholder="Unique Username" required />
         </label>
         <label>
           <p>Email:</p>
           <input onChange={handleInput} name="email" type="email" placeholder="Enter Email" />
         </label>
         <label>
           <p>Password:</p>
           <input onChange={handleInput} id="psw" name="password" type="password" minLength="8" placeholder="Enter Password" required/>
=======
           <input value={userFormData.username} name="name" placeholder="Unique Username" />
         </label>
         <label>
           <p>Email:</p>
           <input value={userFormData.email} email="email" placeholder="Enter Email" />
         </label>
         <label>
           <p>Password:</p>
           <input value={userFormData.password} id="psw" type="password" minlength="8" placeholder="Enter Password" name="psw" required/>
>>>>>>> 7838f6980b56b26e28477340f8e34d2a9087638c
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