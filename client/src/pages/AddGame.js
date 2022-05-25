import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { CREATE_GAME } from '../utils/mutations';
//import '../styles/style.css';

import { QUERY_CATEGORIES } from '../utils/queries';

function AddGame() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categories = data?.categories || [];

  const [gameFormData, setGameFormData] = useState({ gameName: '', description: '', categories: [] });

  //mutation
  const [createGame] = useMutation(CREATE_GAME);

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "categories") {
      const categoryArr = Array.from(event.target.selectedOptions, option => option.value);
      setGameFormData({ ...gameFormData, [name]: categoryArr });
    }
    else {
      setGameFormData({ ...gameFormData, [name]: value });
    }
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const newGame = await createGame({
        variables: { ...gameFormData },
      });

      console.log(newGame);

      setGameFormData({
        gameName: '', description: '', categories: []
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
          <label for="category"></label>
          <select value={gameFormData.categories} id="selectedCategory" name="categories" multiple={true} onChange={handleInput}>
            {categories && categories.map(category => (
              <option key={category._id} value={category._id}>{category.categoryName}</option>
            ))}
          </select>

          <label>
            <p>Game Name:</p>
            <input value={gameFormData.gameName} name="gameName" placeholder="Game Name" onChange={handleInput} />
          </label>
          <label>
            <p>Description:</p>
            <textarea value={gameFormData.description} name="description" placeholder="Description" onChange={handleInput} />
          </label>
          <label>
            <p>Rating:</p>
            <p> &#9787; or &#9785; </p>
          </label>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddGame;