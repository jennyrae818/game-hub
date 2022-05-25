import React from 'react';
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client';
//import './styles/style.css';

import { QUERY_SINGLE_GAME } from '../utils/queries';

function Game() {
  const location = useLocation();
  const { gameId } = location.state;
  console.log(gameId);

  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { _id: gameId }
  });
  const game = data?.game || {};

  console.log(data);

  return (
    <section className="game">
    
      <h2>  --NAME OF GAME--  </h2>
      <h3> Description: </h3>
      <p>{game.description}</p>
      <h3> OverAll Rating: {game.rating}</h3>
      <table>
        <tr>
          <th>Username</th>
          <th># Times Played</th>
          <th>Rating</th>
        </tr>
        <tr>
          <td>wonderwoman22</td>
          <td>40</td>
          <td> &#9787; </td> 
       </tr>
       <tr>
         <td>wonderman43</td>
          <td>2</td>
          <td> &#9785; </td>

        </tr>
      </table>
           
    </section>
  );
}

export default Game;