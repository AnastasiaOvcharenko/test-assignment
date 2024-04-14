import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const buttonStyle = {
  position: "absolute",
  height: "40px",
  width: "40px",
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0.6,
  border: "none",
  cursor: "pointer",
};

function ButtonPrev({ handleClick }) {
  return (
    <button style={{ ...buttonStyle, left: 0 }} onClick={handleClick}>
      <ArrowLeftOutlined />
    </button>
  );
}

function ButtonNext({ handleClick }) {
  return (
    <button style={{ ...buttonStyle, right: 0 }} onClick={handleClick}>
      <ArrowRightOutlined />
    </button>
  );
}

export { ButtonPrev, ButtonNext };
