// MovieCast.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true); // Додаємо стан завантаження

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDE5MmVhNzI4MWE4ZGRkY2Y4NWQzNGY0ZjU0MWNkNSIsIm5iZiI6MTcyNjkyNTYyMi4xODQ5MTYsInN1YiI6IjY2ZWRhZmMyMTkyM2ZlMDMyN2FkZTkzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CbpBhMGMc8FenSUP-azVQg86igYBYKq3K4kY6PxzbBY",
            },
          }
        );
        const filteredCast = response.data.cast
          .filter((actor) => actor.profile_path)
          .slice(0, 20); // Обмежуємо кількість до 20 акторів
        setCast(filteredCast);
      } catch (error) {
        console.error(
          "Failed to fetch cast:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false); // Встановлюємо стан "завантажено"
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>; // Відображаємо "Loading..." під час завантаження
  if (!cast.length) return <p>No cast information available</p>;

  return (
    <div className={styles.container}>
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id} className={styles.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              className={styles.castImage}
            />
            <div className={styles.castInfo}>
              <p className={styles.castName}>
                &#8226; <b>Name:</b> {name}
              </p>
              <p className={styles.castCharacter}>
                &#8226; <b>Character:</b> {character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;