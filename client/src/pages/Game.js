import React from 'react';
//import './styles/style.css';

function Game() {
  return (
    <section className="game">
    
      <h2>  --NAME OF GAME--  </h2>
      <h3> Description: </h3>
      <h3> OverAll Rating: </h3>
      <table>
        <tr>
          <th>Username</th>
          <th># Times Played</th>
          <th>Rating</th>
        </tr>
        <tr>
          <td>wonderwoman22</td>
          <td>40</td>
          <td> &#9787; </td> 
       </tr>
       <tr>
         <td>wonderman43</td>
          <td>2</td>
          <td> &#9785; </td>
        </tr>
      </table>
      
      
      <form>
        <fieldset>
        <label>
            <p>Add Your Own Review:</p>
            {/* <input value={} name="userreview" placeholder="Start your review here..." onChange={handleInput} /> */}
        </label>
        <button type="addreview">Add Review</button>
        </fieldset>
      </form>


      <div className="container">
      <h3>Reviews</h3>
      <p>Username: Reviews to display here </p>
      </div>
     
    </section>
  );
}

export default Game;