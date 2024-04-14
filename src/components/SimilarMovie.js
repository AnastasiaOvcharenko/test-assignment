import React from "react";
import { useNavigate } from "react-router-dom";

function SimilarMovie({ movie }) {
  const navigate = useNavigate();
  const { id, name, poster, alternativeName } = movie;
  return (
    <div
      onClick={() => navigate(`/movie/${id}`)}
      style={{
        flexShrink: 0,
      }}
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
        <p>{name || alternativeName}</p>
      </div>
    </div>
  );
}

export default SimilarMovie;
