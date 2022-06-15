import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SINGLE_GAME, QUERY_GAME_USERS } from "../utils/queries";
import { ADD_REVIEW, THUMBSUP_GAME, THUMBSDOWN_GAME, ADD_GAME_TO_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Game() {
  //use location to figure out gameId for page
  const location = useLocation();
  const { gameId } = location.state;

  //single game data
  const { data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { _id: gameId }
  });
  const game = data?.game || {};

  //user data to see who plays
  const { data: user } = useQuery(QUERY_GAME_USERS, {
    variables: { games: gameId }
  });
  const users = user?.users || [];

  //data for user logged in
  const { data: me } = useQuery(QUERY_ME);
  const thisUser = me?.me || [];

  //set review state
  const [reviewFormData, setReviewFormData] = useState({ reviewBody: '' })

  //set thumbs up/down state
  const [ratingFormData, setRatingFormData] = useState({ thumbsUp: 0, thumbsDown: 0 });

  //mutations
  const [addReview] = useMutation(ADD_REVIEW);
  const [thumbsUpGame] = useMutation(THUMBSUP_GAME);
  const [thumbsDownGame] = useMutation(THUMBSDOWN_GAME);
  const [addGame] = useMutation(ADD_GAME_TO_USER);

  //handle review body input
  const handleInput = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  }

  //event handler for submitting the review
  const handleSubmit = async (event) => {
    event.preventDefault();

    //await addReview before setting the review body
    try {
      await addReview({
        variables: {
          gameId: game._id,
          ...reviewFormData
        }
      });

      //reset form data
      setReviewFormData({ reviewBody: '' });

    } catch (err) {
      console.error(err);
    }
  }

  //handle thumbs up and thumbs down
  const handleRatingChange = async (event) => {
    const { value } = event.target;
    //if like then thumbs up if dislike then thumbs down
    if (value === "like") {
      setRatingFormData({ ...ratingFormData, thumbsUp: 1 });
    }
    else {
      setRatingFormData({ ...ratingFormData, thumbsDown: 1 });
    }
  }

  //event handler for submitting the rating
  const handleSubmitRating = async (event) => {
    event.preventDefault();

    try {
      if (ratingFormData.thumbsUp) {
        await thumbsUpGame({
          variables: {
            gameId: game._id,
            ...ratingFormData
          }
        });
      } else if (ratingFormData.thumbsDown) {
        await thumbsDownGame({
          variables: {
            gameId: game._id,
            ...ratingFormData
          }
        });
      }

      //reset form data
      setRatingFormData({ thumbsUp: 0, thumbsDown: 0 });

    } catch (err) {
      console.error(err);
    }
  }

  //event handler for adding game to user profile
  const handleGameAdd = async (gameId) => {
    
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    //if no token (or invalid) function will return false
    if (!token) {
      return false;
    }

    //get _id of the user from me query
    const idUser = thisUser._id;

    //await adding game to user
    try {
      await addGame({
        variables: {
          userId: idUser,
          gameId: gameId
        }
      });

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="game">
      <h2>  --{game.gameName}--  </h2>
      <div className="container">

        {/* IF LOGGED-IN SHOW ADD-GAME BUTTON */}
        {Auth.loggedIn() ? (
          <div className="subcontainer">
          <h3>Add to Profile:</h3>
                <button className="button"
                  disabled={me?.me.games.some((gameId) => gameId._id === game._id)}
                  onClick={() => handleGameAdd(game._id)}>
                </button>
          </div>
        ) : null}

        {/* GAME INFO */}
        <div className="subcontainer">
          <h3> Description: </h3>
          <p>{game.description}</p>
          <h3> OverAll Rating: {game.rating}</h3>
          <p> &#128077; : {game.thumbsUp}</p>
          <p> &#128078; : {game.thumbsDown}</p>
          <h3> # Users Playing: </h3> <p>{game.usersPlaying}</p>
        </div>

        {/* USERS PLAYING GAME */}
        <div className="subcontainer">
          <h3>Users Who Play:</h3>
          <table>
            {users.map(user => (
              <tr key={user._id}>
                
                  <Link to={`/profile/${user._id}`}>
                  &#9827; {user.username} &#9827;
                  </Link>
                           
              </tr>
            ))}
          </table>
        </div>

        {/* RATING */}
        <form onSubmit={handleSubmitRating}>
          <fieldset>
            <label>
              <h3>Add Your Own Rating:</h3>
              <div className="rating">
                <label>
                  <input type="radio" name="rating" className="like" value="like" onChange={handleRatingChange} />
                  &nbsp; &#128077; Like  &nbsp;  &nbsp; 
                </label>
                <label>
                  <input type="radio" name="rating" className="dislike" value="dislike" onChange={handleRatingChange} />
                  &nbsp; &#128078; Dislike 
                </label>
              </div>
              <button type="submit">Submit Rating</button>
            </label>
          </fieldset>
        </form>

        {/* IF LOGGED-IN ADD A REVIEW */}
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

        {/* REVIEWS DISPLAY */}
        <div className="subcontainer">
          <h3>Reviews:</h3>
          {Object.keys(game).length === 0 ? (
            <>
              <p>There is an error getting reviews right now, our apologies!</p>
            </>
          ) : (
            <>
              <ul>{game.reviews.map(review => (
                <li key={review.reviewId}>
                  &#9827; {review.username} says: {review.reviewBody} &#9830; Created at: {review.createdAt}
                </li>))}
              </ul>
            </>
          )}
        </div>
      </div>

    </section>
  );
}

export default Game;