// MovieDetailsPage.jsx

import {
    useParams,
    Outlet,
    Link,
    useNavigate,
    useLocation,
    Navigate,
  } from "react-router-dom";
  import { useEffect, useState, useRef } from "react"; // Додано useRef
  import axios from "axios";
  import styles from "./MovieDetailsPage.module.css";
  
  const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
  
    // Додаємо useRef для збереження значення location.state
    const prevLocationRef = useRef(location.state?.from || "/movies"); // Використовуємо useRef для збереження початкового стану
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWY0YTUxZmYwNmU0NDIyNzVmYWEzODUyZjU0OTQyYSIsIm5iZiI6MTczOTAxMzY3OC4yOTksInN1YiI6IjY3YTczZTJlYmYwYTlmNmY1NGUwNjdlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktGadCIWIOWKl6Wzb7UPLtbcdaoyCZcfh3u9Scn53Dk",
              },
            }
          );
          setMovie(response.data);
        } catch (err) {
          setError(true);
        }
      };
  
      fetchMovieDetails();
    }, [movieId]);
  
    const handleGoBack = () => {
      navigate(prevLocationRef.current); // Використовуємо значення з useRef для повернення
    };
  
    if (error) {
      return <Navigate to="/404" />;
    }
  
    if (!movie) return null;
  
    return (
      <div className={styles.container}>
        <button onClick={handleGoBack} className={styles.backButton}>
          Go back
        </button>
        <h1 className={styles.title}>
          {movie.title} ({movie.release_date.split("-")[0]})
        </h1>
        <div className={styles.details}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
          <div className={styles.info}>
            <p>User score: {Math.round(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <h2>Additional information</h2>
          <nav className={styles.navLinks}>
            <Link to="cast" state={{ from: prevLocationRef.current }}>
              {" "}
              {/* Передаємо стан з useRef */}
              Cast
            </Link>
            <Link to="reviews" state={{ from: prevLocationRef.current }}>
              {" "}
              {/* Передаємо стан з useRef */}
              Reviews
            </Link>
          </nav>
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default MovieDetailsPage;