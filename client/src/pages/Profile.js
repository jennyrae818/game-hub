import React from 'react';
//import './styles/style.css';

function Profile() {
  return (
    <section className="profile">
    
      <h2>User Profile</h2>
      <h3>My Games</h3>
      <table>
        <tr>
          <th>My Games</th>
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

export default Profile;