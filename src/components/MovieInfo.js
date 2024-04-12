import React from "react";
import { useSearch } from "../context/SearchProvider";
import { useParams } from "react-router-dom";

function MovieInfo() {
  const { currentMovie } = useSearch();
  const { id } = useParams();
  // console.log(id);
  return (
    <section className="movieInfo">
      <p className="movieInfoRating">
        Рейтинг на Кинопоиске:
        <span className="movieInfoRatingEm">
          <strong>{currentMovie.rating?.kp}</strong>
        </span>
      </p>
      <h1 className="movieInfoPrimary">{currentMovie.name}</h1>
      <div className="movieInfoContainer">
        <div className="movieInfoDesc">
          <p>{currentMovie.description}</p>
        </div>
        <div className="movieInfoDetails">
          <p>Жанры:</p>
          <p>Год выпуска: {currentMovie.year}</p>
          {currentMovie.ageRating && (
            <p>Ограничение: {currentMovie.ageRating}+</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieInfo;
