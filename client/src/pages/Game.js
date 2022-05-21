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
           
    </section>
  );
}

export default Game;