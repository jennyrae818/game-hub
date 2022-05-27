import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

import { QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';
import { REMOVE_GAME_FROM_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function Profile() {
  const { userId: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_SINGLE_USER : QUERY_ME, { 
    variables: { userId: userParam }
  });

  const [removeGameFromUser] = useMutation(REMOVE_GAME_FROM_USER);

  console.log(data);
  console.log(userParam);
  const user = data?.me || data?.user || {}; 
  console.log(user, 'user');
  
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(gameId);
    if (!token) {
      return false;
    }

    try {

      const removeGame = await removeGameFromUser({
        variables: { gameId }
      });
      
      console.log(removeGame);
    } catch (err) {
      console.error(err);
    }
  };
  
  
  if (loading) {
    return <div>LOADING</div>;
  }

  console.log(user);


  return (
    <section className="profile">

      <h2>{userParam ? `${user.username}` : 'My Profile'}</h2>
      <h3>My Games</h3>
      <table>
        <tr>
          {Auth.loggedIn() ? (
            <th>Remove?</th>
          ) : null}
          <th>My Games</th>
          <th>Category</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>
        {user.games && user.games.map(game => (
          <tr key={game._id}>
            {Auth.loggedIn() ? (
              <td>
                <button onClick={() => handleDeleteGame(game._id)}>
                  Remove
                </button>
              </td>
            ) : null}
            <td><Link to="/game" state={{ gameId: game._id }}>{game.gameName}</Link></td>
            <td><ul>{game.categories.map(category => (<li key={category._id}>{category.categoryName}</li>))}</ul></td>
            <td>{game.usersPlaying}</td>
            <td>{game.rating}</td>
          </tr>
        ))}
      </table>

    </section>
  );
}
export default Profile;