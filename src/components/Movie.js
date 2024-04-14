import React from "react";
import { useNavigate } from "react-router-dom";
import useWindow from "../hooks/useWindow";

function Movie({ movie }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    poster,
    ageRating,
    countries,
    genres,
    year,
    alternativeName,
  } = movie;

  const { width, height } = useWindow();

  function getLimit() {
    if (width >= 1200) return 5;
    if (width >= 960) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    if (width < 480) return 1;
  }

  const limit = getLimit();

  return (
    <div
      className="hoverable"
      style={{
        width: `calc((100% - ${(limit - 1) * 3}%) * (1 / ${limit}))`,
        margin: "2.4rem 0",
        transition: "all 0.2s",
      }}
      onClick={() => navigate(`/movie/${id}`)}
    >
      <img
        style={{
          width: "100%",
          height: "60vh",
          objectFit: "cover",
          cursor: "pointer",
        }}
        src={poster.url || "https://st.kp.yandex.net/images/no-poster.gif"}
        alt={`Poster`}
      />
      <div style={{ fontSize: "1.6rem" }}>
        <p>
          {name || alternativeName}
          <span style={{ color: "#8a8a8a" }}> / {genres[0]?.name}</span>
        </p>
        <p>
          {ageRating && `${ageRating}+ /`} {year ? year : ""} /{" "}
          {countries[0]?.name}
        </p>
      </div>
    </div>
  );
}

export default Movie;
