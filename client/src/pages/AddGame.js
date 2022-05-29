import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { CREATE_GAME } from '../utils/mutations';

import { QUERY_CATEGORIES } from '../utils/queries';

function AddGame() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categories = data?.categories || [];

  const [gameFormData, setGameFormData] = useState({ gameName: '', description: '', thumbsUp: 0, thumbsDown: 0, categories: [] });

  //mutation
  const [createGame] = useMutation(CREATE_GAME);

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "categories") {
      const categoryArr = Array.from(event.target.selectedOptions, option => option.value);
      setGameFormData({ ...gameFormData, [name]: categoryArr });
    }
    else if (name === "rating") {
      if (value === "like") {
        setGameFormData({ ...gameFormData, thumbsUp: 1 });
      }
      else {
        setGameFormData({ ...gameFormData, thumbsDown: 1 });
      }
    }
    else {
      setGameFormData({ ...gameFormData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Since mutation function is async, wrap in a 'try...catch' to catch any network errors from throwing due to a failed request
    try {
      // Execute mutation and pass in defined parameter data as variables
      const newGame = await createGame({
        variables: { ...gameFormData },
      });

      console.log(newGame);

      setGameFormData({
        gameName: '', description: '', categories: [], thumbsUp: 0, thumbsDown: 0
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addGame">
      <h2> Add A Game!  </h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label for="category">
            <h3>Select a Category:</h3>
            <p>(or multiple)</p>
          </label>
          <select value={gameFormData.categories} id="selectedCategory" name="categories" multiple={true} onChange={handleInput}>
            {categories && categories.map(category => (
              <option key={category._id} value={category._id}>{category.categoryName}</option>
            ))}
          </select>
          <label>
            <h3>Game Name:</h3>
            <input value={gameFormData.gameName} name="gameName" placeholder="Game Name" onChange={handleInput} />
          </label>
          <label>
            <h3>Description:</h3>
            <textarea value={gameFormData.description} name="description" placeholder="Description" onChange={handleInput} />
          </label>
          <label>
            <h3>Rating:</h3>
            <div className="rating">
              <label>
                <input type="radio" name="rating" className="like" value="like" onChange={handleInput} />
                &nbsp; &#9787; Like &nbsp; &nbsp;</label>
              <label>
                <input type="radio" name="rating" className="dislike" value="dislike" onChange={handleInput} />
                &nbsp; &#9785; Dislike </label>
            </div>
          </label>
          <p></p>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddGame;