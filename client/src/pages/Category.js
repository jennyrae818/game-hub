import React from 'react';
import { useQuery } from '@apollo/client';
import {useLocation} from 'react-router-dom';
//import './styles/style.css';

import { QUERY_GAMES } from '../utils/queries';

function Category() {
  const location = useLocation();

  const { loading, data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];

  function filterProducts() {
    const currentCategory = location.state.currentCategoryId;
    
    if (!currentCategory) {
      return games;
    }
    return games.filter(
      (game) => game.categories.some(category => category._id === currentCategory)
    );
  }

  return (
    <section className="category">
    
      <h2>  Search Results Page  </h2>
      <h3> --CATEGORY NAME-- </h3>
      <table>
        <tr>
          <th>Game</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>

        {filterProducts().map(game => (
          <tr>
          <td>{game.gameName}</td>
          <td>{game.usersPlaying}</td>
          <td>{game.rating}</td>
       </tr>
        ))}

        {/* <tr>
          <td>Sorry</td>
          <td>26</td>
          <td>86%</td>
       </tr>
       <tr>
         <td>Cribbage</td>
          <td>5</td>
          <td>100%</td>
        </tr> */}
      </table>
               
    </section>
  );
}

export default Category;