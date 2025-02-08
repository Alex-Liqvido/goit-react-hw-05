// MovieList.jsx

import { Link, useLocation } from "react-router-dom"; // Додано useLocation
import styles from "./MovieList.module.css";
import { useState, useEffect } from "react";

const MovieList = ({ movies, onMovieClick }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const location = useLocation(); // Додано useLocation для передачі поточного розташування

  useEffect(() => {
    if (movies.length) {
      const moviesWithPosters = movies.filter((movie) => movie.poster_path);
      setFilteredMovies(moviesWithPosters);
      setSearched(true);
    }
  }, [movies]);

  if (searched && !filteredMovies.length) return <p>No movies found</p>;

  return (
    <ul className={styles.movieList}>
      {filteredMovies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.movieItem}>
          <Link
            to={`/movies/${id}`}
            className={styles.movieLink}
            onClick={() => onMovieClick(id)}
            state={{ from: location }} // Додаємо стан з поточного розташування для передачі до сторінки фільму в компоненті Link для збереження попередньої сторінки
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${poster_path}`}
              alt={title}
              className={styles.moviePoster}
            />
            <p className={styles.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;