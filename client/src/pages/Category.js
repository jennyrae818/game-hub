import React from 'react';
//import './styles/style.css';

function Category() {
  return (
    <section className="category">
    
      <h2>  Search Results Page  </h2>
      <h3> --CATEGORY NAME-- </h3>
      <table>
        <tr>
          <th>Game</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>
        <tr>
          <td>Sorry</td>
          <td>26</td>
          <td>86%</td>
       </tr>
       <tr>
         <td>Cribbage</td>
          <td>5</td>
          <td>100%</td>
        </tr>
      </table>
               
    </section>
  );
}

export default Category;