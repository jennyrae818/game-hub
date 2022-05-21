import React from 'react';
//import '../styles/style.css';



function AddGame() {
  return (
    <div className="addGame">
    <h2> Add A Game!  </h2>
      <form>
      <fieldset>
      <label for="category"></label>
                {/* <select id="selectedCategory" name "dropdown">
                    {{#each categories as |category|}}
                    <option value="{{category.id}}" selected>{{category.category_name}}</option>
                    {{/each}}
                </select> */}
                <input id="name" type="text" placeholder="Category" name="Title" required />
         <label>
           <p>Game Name:</p>
           <input gamename="gamename" placeholder="Game Name" />
         </label>
         <label>
           <p>Description:</p>
           <textarea description="description" placeholder="Description" />
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