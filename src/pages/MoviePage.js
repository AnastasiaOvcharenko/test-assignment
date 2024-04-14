import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { fetchWithToken, useSearch } from "../context/SearchProvider";
import MovieInfo from "../components/MovieInfo";
import Posters from "../components/Posters";
import Actors from "../components/Actors";
import Reviews from "../components/Reviews";
import SimilarMovies from "../components/SimilarMovies";
import Seasons from "../components/Seasons";
import ButtonBack from "../components/ButtonBack";
import Navbar from "../components/Navbar";

function MoviePage() {
  let { id } = useParams();
  const { dispatch, isLoading, currentMovie } = useSearch();

  useEffect(
    function () {
      const fetchMovieData = async function () {
        dispatch({ type: "loading" });
        try {
          const data = await fetchWithToken(`v1.4/movie/${id}`);
          dispatch({ type: "movieData/loaded", payload: data });
        } catch {
          dispatch({
            type: "rejected",
          });
        }
      };
      fetchMovieData();
    },
    [id]
  );

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <>
      <Navbar />
      <main>
        <ButtonBack />
        {currentMovie.id && (
          <>
            <Posters
              firstPosterUrl={
                currentMovie.poster?.url ||
                "https://st.kp.yandex.net/images/no-poster.gif"
              }
            />
            <MovieInfo />
            <SimilarMovies />
            <Actors />
            <Reviews />
            {currentMovie.isSeries && <Seasons />}{" "}
          </>
        )}
      </main>
    </>
  );
}

export default MoviePage;
