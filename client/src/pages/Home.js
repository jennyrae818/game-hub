import React from 'react';
import { useQuery } from '@apollo/client';
//import './styles/style.css';

import { QUERY_GAMES } from '../utils/queries';

function Home() {
  const { loading, data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];
  console.log(data);

  return (
    <section className="home">

      <h2>  Popular Games  </h2>
      <table>
        <tr>
          <th>Game</th>
          <th>Category</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>
        {games && games.map(game => (
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

export default Home;