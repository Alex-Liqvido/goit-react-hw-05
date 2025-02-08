// MoviesPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom"; // Додано useSearchParams

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); // Додано useSearchParams для управління параметрами URL
  const query = searchParams.get("query") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (query === "") return;

    const fetchMovies = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDE5MmVhNzI4MWE4ZGRkY2Y4NWQzNGY0ZjU0MWNkNSIsIm5iZiI6MTcyNzAwMTY2Ni4xMzIwOTEsInN1YiI6IjY2ZWRhZmMyMTkyM2ZlMDMyN2FkZTkzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bskYBCpzCTi37gzV1pEvqUNZ6uNnD0jSHaCsh-ijqbE",
            },
          }
        );

        if (response.data.results.length === 0) {
          navigate("/404");
        } else {
          setMovies(response.data.results);
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchMovies();
  }, [query, navigate]); // Викликаємо useEffect при зміні запиту

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      navigate("/404");
      return;
    }

    setSearchParams({ query });
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: "/movies" } });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          className={styles.input}
          placeholder="Search movies..."
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default MoviesPage;