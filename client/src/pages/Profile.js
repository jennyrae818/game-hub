import React from 'react';
import { useQuery } from '@apollo/client';
<<<<<<< HEAD
//import './styles/style.css';

import { QUERY_ME } from '../utils/queries';

function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  
  console.log(data);

  const user = data?.me || {}; 
=======
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
//import './styles/style.css';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

function Profile() {
  const { userId } = useParams;

  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId: userId }
    }
  );
  
  const user = data?.me || data?.user || {}; 

  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile" />;
  }
>>>>>>> 6bea78c (starting profile page)

  if (loading) {
    return <div>LOADING</div>;
  }

<<<<<<< HEAD
  console.log(user);
=======
  if (!user?.username) {
    return (
      <h2>
        Please sign-up or register to view this page!
      </h2>
    );
  }
>>>>>>> 6bea78c (starting profile page)
  
  return (
    <section className="profile">
    
      <h2>{`${user.username}`}</h2>
      <h3>My Games</h3>
      <table>
        <tr>
          <th>My Games</th>
          <th>Category</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>
        {user.games && user.games.map(game => (
          <tr>
            <td>{game.gameName}</td>
            <td><ul>{game.categories.map(category => (<li>{category.categoryName}</li>))}</ul></td>
            <td>{game.usersPlaying}</td>
            <td>{game.rating}</td>
          </tr>
        ))}
      </table>
                
    </section>
  );
}

export default Profile;