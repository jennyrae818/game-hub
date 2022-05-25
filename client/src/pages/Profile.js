import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
//import './styles/style.css';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

function Profile() {
  const { userId } = useParams();

  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId: userId }
    }
  );
  
  const user = data?.me || data?.user || {}; 
  console.log(userId);
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>LOADING</div>;
  }

  console.log(user);
  // if (!user?.username) {
  //   return (
  //     <h2>
  //       Please sign-up or register to view this page!
  //     </h2>
  //   );
  // }
  
  return (
    <section className="profile">
    
      <h2>{`${user.username}`}</h2>
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