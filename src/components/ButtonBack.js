import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "antd";

function ButtonBack() {
  const navigate = useNavigate();

  function handleBack(e) {
    e.preventDefault;
    navigate(-1);
  }

  return (
    <Button style={{ margin: "1.2rem" }} onClick={handleBack}>
      &larr; Назад
    </Button>
  );
}

export default ButtonBack;
