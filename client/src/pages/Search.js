import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
//import './styles/style.css';

import { QUERY_CATEGORIES } from '../utils/queries';

function Search() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categories = data?.categories || [];

  const navigate = useNavigate();

  const [currentCategoryId, setCategory] = useState();

  const handleClick = () => {
    navigate('/category',{state:{currentCategoryId:currentCategoryId}});
  }

  return (
    <div className="search">
      <h2> Search by Category </h2>
      <div className="search_categories">
      <form className="searchform">   
      <fieldset>
    
          <label for="category"><p>Select a category:</p></label>
          <select id="selectedCategory" name="dropdown" value={currentCategoryId} on onChange={(e) => setCategory(e.target.value)}>
            <option className='option'><p> All </p></option>
            {categories && categories.map(category => (
              <option className="option" key={category._id} value={category._id}>{category.categoryName}</option>
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

