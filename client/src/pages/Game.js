import React from 'react';
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from '../utils/queries';
import { QUERY_GAME_USERS } from '../utils/queries';
import Auth from '../utils/auth';

function Game() {
  const location = useLocation();
  const { gameId } = location.state;

  var { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { _id: gameId }
  });
  const game = data?.game || {};

  var { loading, data } = useQuery(QUERY_GAME_USERS, {
    variables: { games: gameId }
  });
  const users = data?.users || [];
  console.log(users);

  return (
    <section className="game">

      <h2>  --{game.gameName}--  </h2>
      <h3> Description: </h3>
      <p>{game.description}</p>
      <h3> OverAll Rating: {game.rating}</h3>
      <h3> &#9787; : {game.thumbsUp}</h3>
      <h3> &#9785; : {game.thumbsDown}</h3>
      <h3> # Users playing: {game.usersPlaying}</h3>
      <table>
        <tr>
          <th>Username</th>

          {/* <th># Times Played</th>
                <th>Rating</th> */}

        </tr>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.username}</td>
            {/* <td>40</td>
                  <td> &#9787; </td> */}
          </tr>
        ))}
      </table>

      <form>
        <fieldset>
        <label>
            <p>Add Your Own Review:</p>
            {/* <input value={} name="userreview" placeholder="Start your review here..." onChange={handleInput} /> */}
        </label>
        <button type="addreview">Add Review</button>
        </fieldset>
      </form>


      <div className="container">
      <h3>Reviews</h3>
      <p>Username: Reviews to display here </p>
      </div>

    </section>
  );
}

export default Game;