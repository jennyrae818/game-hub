import React from 'react';
//import './styles/style.css';



function Search() {
  return (
    <div className="search">
    <h2> Search by Category </h2>
  
        <form className="searchform">
            <div className="container">
                <label for="category"></label>
                {/* <select id="selectedCategory" name "dropdown">
                    {{#each categories as |category|}}
                    <option value="{{category.id}}" selected>{{category.category_name}}</option>
                    {{/each}}
                </select> */}
                <input id="name" type="text" placeholder="Category" name="Title" required />

                <button type="submit" className="searchbtn">Submit</button>
            </div>
        </form>
    </div>

      );
    }
    
    export default Search;

