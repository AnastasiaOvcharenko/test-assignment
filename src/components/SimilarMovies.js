import React, { useState } from "react";
import SimilarMovie from "./SimilarMovie";
import { useSearch } from "../context/SearchProvider";
import { Col, Row } from "antd";
import { ButtonNext, ButtonPrev } from "./SliderButtons";
import useWindow from "../hooks/useWindow";

function SimilarMovies() {
  const { currentMovie, isLoading } = useSearch();
  const [curSlide, setCurSlide] = useState(0);
  const { width, height } = useWindow();

  function getLimit() {
    if (width >= 1250) return 6;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    if (width < 480) return 1;
  }

  const limit = getLimit();

  function handleNext() {
    currentMovie.similarMovies.length > limit * (curSlide + 1) &&
      setCurSlide((cur) => cur + 1);
  }
  function handlePrev() {
    curSlide > 0 && setCurSlide((cur) => cur - 1);
  }

  if (isLoading) return <p>Загрузка...</p>;

  if (currentMovie.similarMovies.length === 0)
    return <h1 className="primary">Похожие фильмы отсутствуют</h1>;

  return (
    <>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          margin: "2.4rem 0",
        }}
      >
        <h1 className="primary">Похожие фильмы</h1>
        {/* {isLoading && <h1>Loading...</h1>} */}
        <div
          style={{
            display: "flex",
            transform: `translateX(-${100 * curSlide}vw)`,
            transition: "all 300ms",
          }}
        >
          {!isLoading && currentMovie.similarMovies !== undefined ? (
            <>
              <Row gutter={40} style={{ margin: "2.4rem 0" }} wrap={false}>
                {currentMovie.similarMovies.map((movie) => (
                  <Col span={24 / limit} className="hoverable">
                    <SimilarMovie movie={movie} key={movie.id} />
                  </Col>
                ))}
              </Row>
            </>
          ) : null}
        </div>

        <ButtonPrev handleClick={handlePrev} />
        <ButtonNext handleClick={handleNext} />
      </section>
    </>
  );
}

export default SimilarMovies;
