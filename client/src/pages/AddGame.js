import React from 'react';
//import '../styles/style.css';



function AddGame() {
  return (
    <div className="addGame">
    <h2> Add A Game  </h2>
      <form>
      <fieldset>
         <label>
           <p>DROP DOWN MENU</p>
           <input name="name" />
         </label>
         <label>
           <p>Game Name:</p>
           <input email="email" />
         </label>
         <label>
           <p>Description:</p>
           <textarea message="message" />
         </label>
       
       <button type="submit">Submit</button>
       </fieldset>
      </form>
    </div>
      );
    }
    
    export default AddGame;