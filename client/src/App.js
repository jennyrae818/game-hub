import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout.js";
import Home from './components/home.js';
import AddGame from './components/AddGame.js';
import Category from './components/Category.js';
import Game from './components/Game.js';
import LogIn from './components/LogIn.js';
import Profile from './components/Profile.js';
import Register from './components/Register.js';
import Search from './components/Search.js';

//FOR LATER
//import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
//import { setContext } from '@apollo/client/link/context';

function App() {
  return (
    <Router>
    <>
      <Routes>
        <Route path='/' element={<Layout />}/>
        <Route index element={<Home />} />
        <Route path="addgame" element={<AddGame />} />
          <Route path="category" element={<Category />} />
          <Route path="game" element={<Game />} />
          <Route path="login" element={<LogIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<Search />} />
        <Route/>
      </Routes>
    </>
  </Router>
  );
}

export default App;
