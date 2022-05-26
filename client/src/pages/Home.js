import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
//import './styles/style.css';

import Auth from '../utils/auth';

import { QUERY_GAMES, QUERY_ME } from '../utils/queries';
import { ADD_GAME_TO_USER } from '../utils/mutations';

function Home() {
  const { data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];
  const { data: me } = useQuery(QUERY_ME);
  const thisUser = me?.me || [];
  console.log(games);
  console.log(thisUser._id);
  
  const [addGame] = useMutation(ADD_GAME_TO_USER);


  const handleGameAdd = async (gameId) => {
    const gameFound = data?.games.find((game) => game._id === gameId);
    console.log(gameId);
    console.log(gameFound, 'gameFound');

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    
    const gameAddId = gameFound._id;
    console.log(gameAddId, 'gameAddId');
    const idUser = thisUser._id;
    console.log(idUser, 'idUser')

    try {
      const gameAdd = await addGame({
        variables: {
          userId: idUser,
          gameId: gameAddId
        }
    });

    console.log(gameAdd);
    window.location.reload();
    
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
        {games.map(game => (
          <tr>
            <button onClick={() => handleGameAdd(game._id)}>Add</button>
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

export default Home;