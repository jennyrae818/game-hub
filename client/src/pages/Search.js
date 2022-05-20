import React from 'react';
//import './styles/style.css';



function Search() {
  return (
    <div className="search">
    <h2> Select a Category </h2>
      <form>
      <fieldset>
         <label>
           <p>DROP DOWN </p>
           <input name="name" />
         </label>
       
       <button type="submit">Send</button>
       </fieldset>
      </form>
    </div>
      );
    }
    
    export default Search;