import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { QUERY_CATEGORIES } from '../utils/queries';

function Search() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categories = data?.categories || [];

  const navigate = useNavigate();

  // Category id of category selected by user
  const [currentCategoryId, setCategory] = useState();

  const handleClick = () => {
    navigate('/category', { state: { currentCategoryId: currentCategoryId } });
  }

  return (
    <div className="search">
      <h2> Search by Category </h2>
      <div className="search_categories">
        <form>
          <fieldset>
            <label for="category"><p>Select a Category:</p></label>
            <select className="styleDrop" id="selectedCategory" name="dropdown" value={currentCategoryId} on onChange={(e) => setCategory(e.target.value)}>
              <option className="styleDrop"><p> All </p></option>
              {categories && categories.map(category => (
                <option className="styleDrop" key={category._id} value={category._id}>{category.categoryName}</option>
              ))}
            </select>

            <p> <button type="submit" className="searchbtn" onClick={handleClick}>Submit</button> </p>
          </fieldset>

        </form>
      </div>
    </div>
  );
}

export default Search;

