import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

import { QUERY_GAMES, QUERY_ME } from '../utils/queries';
import { ADD_GAME_TO_USER } from '../utils/mutations';

function Home() {
  const { data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];
  const { data: me } = useQuery(QUERY_ME);
  const thisUser = me?.me || [];
  
  
  const [addGame] = useMutation(ADD_GAME_TO_USER);


  const handleGameAdd = async (gameId) => {
    //const gameFound = data?.games.find((game) => game._id === gameId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    
    const idUser = thisUser._id;
    

    try {
      const gameAdd = await addGame({
        variables: {
          userId: idUser,
          gameId: gameId
        }
    });

    console.log(gameAdd);
    
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="home">

      <h2>  Popular Games  </h2>
      <table>
        <tr>
          <th>Add</th>
          <th>Game</th>
          <th>Category</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>

        {games && games.map(game => (
          <tr>
            <button onClick={() => handleGameAdd(game._id)}>Add</button>
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

export default Home;