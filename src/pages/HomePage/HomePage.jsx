// HomePage.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDE5MmVhNzI4MWE4ZGRkY2Y4NWQzNGY0ZjU0MWNkNSIsIm5iZiI6MTcyNzAwMTY2Ni4xMzIwOTEsInN1YiI6IjY2ZWRhZmMyMTkyM2ZlMDMyN2FkZTkzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bskYBCpzCTi37gzV1pEvqUNZ6uNnD0jSHaCsh-ijqbE",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: "/" } });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies Today</h1>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default HomePage;