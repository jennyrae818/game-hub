import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from '../utils/queries';
import { QUERY_GAME_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import { ADD_REVIEW } from '../utils/mutations';

function Game() {
  const location = useLocation();
  const { gameId } = location.state;

  var { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { _id: gameId }
  });
  const game = data?.game || {};

  var { loading, data } = useQuery(QUERY_GAME_USERS, {
    variables: { games: gameId }
  });
  const users = data?.users || [];
  console.log(users);

  //review
  const [reviewFormData, setReviewFormData] = useState({ reviewBody: '' })

  //mutation
  const [addReview] = useMutation(ADD_REVIEW);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(reviewFormData);
    try {
      const newReview = await addReview({
        variables: {
          gameId: game._id,
          ...reviewFormData
        }
      });

      console.log(newReview);

      setReviewFormData({ reviewBody: '' });

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <section className="game">
     
      <h2>  --{game.gameName}--  </h2>
    <form>
      <fieldset>
      <h3> Description: </h3>
      <p>{game.description}</p>
      <h3> OverAll Rating: {game.rating}</h3>
      <p> &#9787; : {game.thumbsUp}</p>
      <p> &#9785; : {game.thumbsDown}</p>
      <h3> # Users playing: </h3> <p>{game.usersPlaying}</p>
      </fieldset>
    </form>

        <form>
        <fieldset>
          <label>
            <h3>Add Your Own Rating:</h3>
            <div className="rating">
              <label>
                <input type="radio" name="rating" className="like" value="like" onChange={handleInput}/>
                &#9787; Like </label>
              <label>
                <input type="radio" name="rating" className="dislike" value="dislike" onChange={handleInput}/>
                &#9785; Dislike </label>
            </div>
          </label>
          </fieldset>
          </form>

      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <h3>Enter Your Review Here:</h3>
              <input 
                type="text"
                name="reviewBody" 
                onChange={handleInput}
                placeholder="Enter your review here" 
                value={reviewFormData.reviewBody}
              /> 
            </label>
            <button type="submit">Add Review</button>
          </form>
        </>
      ) : (
        <>
        <h3>
          <Link to="/login">Log-In</Link> or 
          <Link to="/register"> Register</Link> to add a review!
        </h3>
        </>
      )}
      <table>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.username}</td>
          </tr>
        ))}
      </table>
      

      <form>
        <fieldset>
        <label>
            <h3>Reviews</h3>
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