import React from 'react';
import { useQuery } from '@apollo/client';
//import './styles/style.css';

import { QUERY_CATEGORIES } from '../utils/queries';

function Search() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categories = data?.categories || [];
  console.log(categories);
  console.log(data);

  return (
    <div className="search">
      <h2> Search by Category </h2>

      <form className="searchform">
        <div className="container">
          <label for="category">Select a category</label>
          <select id="selectedCategory" name="dropdown">
            {categories && categories.map(category => (
              <option key={category._id} value={category._id} selected>{category.categoryName}</option>
            ))}
          </select>
          {/* <input id="name" type="text" placeholder="Category" name="Title" required /> */}

          <button type="submit" className="searchbtn">Submit</button>
        </div>
      </form>
    </div>

  );
} 

export default Search;

