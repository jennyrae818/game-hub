import React from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { QUERY_GAMES, QUERY_SINGLE_CATEGORY } from '../utils/queries';

function Category() {
  const location = useLocation();
  const currentCategory = location.state.currentCategoryId;

  const { loading, data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];

  //single category data
  const { data: categoryData } = useQuery(QUERY_SINGLE_CATEGORY, {
    variables: { _id: currentCategory }
  });
  const category = categoryData?.category || {};

  // Filters the games according to the category id
  function filterProducts() {
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
      <h3> --{category.categoryName}-- </h3>
      <p> {category.description} </p>
      <table>
        <tr>
          <th>Game</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>

        {filterProducts().map(game => (
          <tr>
            <td><Link to="/game" state={{ gameId: game._id }}>{game.gameName}</Link></td>
            <td>{game.usersPlaying}</td>
            <td>{game.rating}</td>
          </tr>
        ))}
      </table>
    </section>
  );
}

export default Category;