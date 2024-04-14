import React from "react";
import { useSearch } from "../context/SearchProvider";
import { useParams } from "react-router-dom";

function MovieInfo() {
  const { currentMovie } = useSearch();
  // const { id } = useParams();

  console.log(currentMovie);

  return (
    <section style={{ margin: "0 3.2rem 6rem 3.2rem" }}>
      <p style={{ fontSize: "1.6rem", margin: "3rem 0" }}>
        Рейтинг на Кинопоиске:
        {currentMovie.rating.kp == 0 ? (
          <span> Информация отсутствует</span>
        ) : (
          <span
            style={{
              backgroundColor: `${
                currentMovie.rating?.kp >= 7
                  ? "green"
                  : currentMovie.rating?.kp >= 4 && currentMovie.rating?.kp < 7
                  ? "yellow"
                  : currentMovie.rating?.kp < 4
                  ? "red"
                  : ""
              }`,
              padding: "0.4rem 0.8rem",
              margin: "0.8rem 0",
              borderRadius: "11px",
            }}
          >
            <strong>{currentMovie.rating?.kp}</strong>
          </span>
        )}
      </p>
      <h1
        style={{ letterSpacing: "1px", fontWeight: "700", fontSize: "2.8rem" }}
      >
        {currentMovie.name || currentMovie.alternativeName}
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            fontSize: "1.8rem",
            margin: "1.6rem 0",
            lineHeight: "1.5",
            letterSpacing: "0.2px",
            width: "65%",
            flexShrink: 0,
          }}
        >
          {currentMovie.description ? (
            <p>{currentMovie.description}</p>
          ) : (
            <p>Описание отсутствует</p>
          )}
        </div>
        <div
          style={{
            margin: "1.6rem 0",
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "#8a8a8a",
            display: "flex",
            flexDirection: "column",
            gap: "1.6rem",
            paddingLeft: "2.4rem",
          }}
        >
          <p>
            Жанры: {currentMovie?.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            Страны:{" "}
            {currentMovie?.countries?.map((country) => country.name).join(", ")}
          </p>
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
