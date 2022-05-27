import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_SINGLE_GAME } from '../utils/queries';
import { QUERY_GAME_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import { ADD_REVIEW, THUMBSUP_GAME, THUMBSDOWN_GAME, ADD_GAME_TO_USER } from '../utils/mutations';

function Game() {
  const location = useLocation();
  const { gameId } = location.state;

  var { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { _id: gameId }
  });
  const game = data?.game || {};

  var { data } = useQuery(QUERY_GAME_USERS, {
    variables: { games: gameId }
  });
  const users = data?.users || [];

  const { data: me } = useQuery(QUERY_ME);
  const thisUser = me?.me || [];

  //review
  const [reviewFormData, setReviewFormData] = useState({ reviewBody: '' })

  const [ratingFormData, setRatingFormData] = useState({ thumbsUp: 0, thumbsDown: 0 });

  //mutation
  const [addReview] = useMutation(ADD_REVIEW);
  const [thumbsUpGame] = useMutation(THUMBSUP_GAME);
  const [thumbsDownGame] = useMutation(THUMBSDOWN_GAME);
  const [addGame] = useMutation(ADD_GAME_TO_USER);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newReview = await addReview({
        variables: {
          gameId: game._id,
          ...reviewFormData
        }
      });

      // console.log(newReview);

      setReviewFormData({ reviewBody: '' });

    } catch (err) {
      console.error(err);
    }
  }

  const handleRatingChange = async (event) => {
    const { value } = event.target;
console.log(value);
    if (value === "like") {
      setRatingFormData({ ...ratingFormData, thumbsUp: 1 });
    }
    else {
      setRatingFormData({ ...ratingFormData, thumbsDown: 1 });
      console.log(ratingFormData);
    }
  }

  const handleSubmitRating = async (event) => {
    event.preventDefault();

    try {
      if (ratingFormData.thumbsUp) {
        const newGameRating = await thumbsUpGame({
          variables: {
            gameId: game._id,
            ...ratingFormData
          }
        });
      } else if (ratingFormData.thumbsDown) {
        console.log(ratingFormData);
        const newGameRating = await thumbsDownGame({
          variables: {
            gameId: game._id,
            ...ratingFormData
          }
        });
      }

      setRatingFormData({ thumbsUp: 0, thumbsDown: 0 });

    } catch (err) {
      console.error(err);
    }
  }

  const handleGameAdd = async (gameId) => {

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    
    const idUser = thisUser._id;
    

    try {
      const gameAdd = await addGame({
        variables: {
          userId: idUser,
          gameId: gameId
        }
    });

    console.log(gameAdd);

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="game">

      <h2>  --{game.gameName}--  </h2>
      {Auth.loggedIn() ? ( 
              <td>
                <button
                  disabled={me?.me.games.some((gameId) => gameId._id === game._id)}
                  onClick={() => handleGameAdd(game._id)}>
                </button>
              </td>
            ) : null}
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
      <table>
        <tr>
          <th>Users who play</th>
        </tr>
        {users.map(user => (
          <tr key={user._id}>
            <td>
              <Link to={`/profile/${user._id}`}>
                {user.username}
              </Link>
            </td>
            {/* <td>40</td>
                  <td> &#9787; </td> */}
          </tr>
        ))}
      </table>

      <form onSubmit={handleSubmitRating}>
        <fieldset>
          <label>
            <h3>Add Your Own Rating:</h3>
            <div className="rating">
              <label>
                <input type="radio" name="rating" className="like" value="like" onChange={handleRatingChange} />
                &#9787; Like </label>
              <label>
                <input type="radio" name="rating" className="dislike" value="dislike" onChange={handleRatingChange}/>
                &#9785; Dislike </label>
            </div>
            <button type="submit">Submit Rating</button>
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


      <div className="container">
        <h3>Reviews</h3>
        {Object.keys(game).length === 0 ? (
          <>
            <p>There is an error getting reviews right now, our apologies!</p>
          </>
        ) : (
          <>
            <ul>{game.reviews.map(review => (
              <li key={review.reviewId}>
                User {review.username} says: {review.reviewBody} created at: {review.createdAt}
              </li>))}
            </ul>
          </>
        )}
      </div>

    </section>
  );
}

export default Game;