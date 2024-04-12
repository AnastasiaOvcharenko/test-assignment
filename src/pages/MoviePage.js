import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getToken } from "../env";
import { useSearch } from "../context/SearchProvider";
import MovieInfo from "../components/MovieInfo";
import Posters from "../components/Posters";
import Actors from "../components/Actors";
import Reviews from "../components/Reviews";
import ButtonBack from "../components/ButtonBack";

function MoviePage() {
  let { id } = useParams();
  const { dispatch, isLoading, currentMovie } = useSearch();

  useEffect(function () {
    const fetchMovieData = async function () {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
          method: "GET",
          headers: {
            "X-API-KEY": getToken(),
          },
        });
        const data = await res.json();
        dispatch({ type: "movieData/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
        });
      }
    };
    fetchMovieData();
  }, []);
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");
  // const lng = searchParams.get("lng");
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <main>
      <ButtonBack />
      <Posters
        firstPosterUrl={
          currentMovie.poster?.url ||
          "https://st.kp.yandex.net/images/no-poster.gif"
        }
      />
      <MovieInfo />
      <Actors />
      <Reviews />
    </main>
  );
}

export default MoviePage;
