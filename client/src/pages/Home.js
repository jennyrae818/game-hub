import React from 'react';
//import './styles/style.css';

function Home() {
  return (
    <section className="home">
    
      <h2>  Popular Games  </h2>
      <table>
        <tr>
          <th>Game</th>
          <th>Category</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>
        <tr>
          <td>Sorry</td>
          <td>Board</td>
          <td>26</td>
          <td>86%</td>
       </tr>
       <tr>
         <td>Cribbage</td>
          <td>Cards</td>
          <td>5</td>
          <td>100%</td>
        </tr>
      </table>
               
    </section>
  );
}

export default Home;