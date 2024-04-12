import { useNavigate } from "react-router-dom";
import React from "react";

function ButtonBack() {
  const navigate = useNavigate();
  return (
    <button
      className="btn back"
      style={{ margin: "1.2rem 0" }}
      onClick={() => navigate(-1)}
    >
      &larr; Вернуться к поиску
    </button>
  );
}

export default ButtonBack;
