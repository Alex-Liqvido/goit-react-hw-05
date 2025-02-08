// MovieReviews.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDE5MmVhNzI4MWE4ZGRkY2Y4NWQzNGY0ZjU0MWNkNSIsIm5iZiI6MTcyNjkyNTYyMi4xODQ5MTYsInN1YiI6IjY2ZWRhZmMyMTkyM2ZlMDMyN2FkZTkzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CbpBhMGMc8FenSUP-azVQg86igYBYKq3K4kY6PxzbBY",
            },
          }
        );
        // Обмежуємо кількість відгуків до 2
        const limitedReviews = response.data.results.slice(0, 2);
        setReviews(limitedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!reviews.length) {
    return <p>No reviews available</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      <ul className={styles.reviewList}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={styles.reviewItem}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;