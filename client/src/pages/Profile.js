import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useLocation, useParams } from "react-router-dom";
import { QUERY_ME, QUERY_SINGLE_USER } from "../utils/queries";
import { REMOVE_GAME_FROM_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Profile() {
  const location = useLocation();
  //get userId from URL
  const { userId: userParam } = useParams();

  //query either single user or me query if no params
  const { data } = useQuery(userParam ? QUERY_SINGLE_USER : QUERY_ME, { 
    variables: { userId: userParam }
  });

  const user = data?.me || data?.user || {}; 
  
  //set game state for reviews
  const [setG, setGame] = useState();


  //filter reviews to get users game reviews
  function filterReviews() {
    const currentGame = setG;
    
    if (!currentGame || setG === 'Games') {
      return user.games;
    }

    return user.games.filter(game => game.gameName === currentGame)[0].reviews.filter(review => review.username === user.username);
  }
  

  //mutation
  const [removeGameFromUser] = useMutation(REMOVE_GAME_FROM_USER);

  //event handler for removing a game from user profile
  const handleDeleteGame = async (gameId) => {
    
    //get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    //if no token return false
    if (!token) {
      return false;
    }

    //await remove game
    try {
      await removeGameFromUser({
        variables: { gameId }
      });  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="profile">
      {/* IF USERPARAM SHOW USERNAME */}
      <h2>{userParam ? `${user.username}` : 'My Profile'}</h2>
      <h3>My Games</h3>
      <table>
        <tr>
          {/* IF USER FROM ME QUERY ADD EXTRA OPTIONS */}
          {user === data?.me ? (
            <>
              <th>Remove?</th>
              <th>My Games</th>
            </>
          ) : (
            <th>Games</th>
          )}
          <th>Category</th>
          <th># Users Playing</th>
          <th>Rating</th>
        </tr>
        {user.games && user.games.map(game => (
          <tr key={game._id}>
            {/* IF USER FROM ME QUERY SHOW REMOVE BUTTON */}
            {user === data?.me ? (
              <td>
                <button onClick={() => handleDeleteGame(game._id)}></button>
              </td>
            ) : null}
            <td><Link to="/game" state={{ gameId: game._id }}>{game.gameName}</Link></td>
            <td><ul>{game.categories.map(category => (<li key={category._id}>{category.categoryName}</li>))}</ul></td>
            <td>{game.usersPlaying}</td>
            <td>{game.rating}</td>
          </tr>
        ))}        
      </table>
      
      {/* Dropdown for reviews */}
      <form>
        <fieldset>
          <label for="reviews"><h3>Reviews:</h3></label>
          <>
            <select className="styleDrop" value={setG} on onChange={(e) => setGame( e.target.value )}>
              <option className="styleDrop"><p>Games</p></option>
              {user.games && user.games.map(game => (
                <option className="styleDrop" value={game.gameName}>{game.gameName}</option>
              ))}
            </select>
          </>
        </fieldset>
      </form>
      {/* map reviews for user */}
      {setG === undefined || setG === "Games" ? (
        <>
          <h3>Please select a game you wish to see {userParam ? `${user.userName}'s` : 'your'} reviews on!</h3>
        </>
      ) : (
      <ul>{filterReviews().map(review => (
        <li key={review.reviewId}>
          &#9827; {review.username} says: {review.reviewBody} &#9830; Created at: {review.createdAt}
        </li>))}
      </ul>
      )}
        
    </section>
  );
}

export default Profile;