import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {
  Header,
  Navbar,
  Footer
} from './components';
import {
  AddGame,
  Home,
  Category,
  Game,
  LogIn,
  Profile,
  Register,
  Search
} from './pages';

//FOR LATER
//import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
//import { setContext } from '@apollo/client/link/context';

function App() {
  return (
    <Router>
    <>
      <Header />
      <Navbar />
      <Routes>       
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
      <Footer />
    </>
  </Router>
  );
}

export default App;
