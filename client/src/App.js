import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
