import React, { useEffect, useState } from "react";
import { Card, Col, Row, Pagination } from "antd";
import { useSearch } from "../context/SearchProvider";
import Review from "./Review";
import useWindow from "../hooks/useWindow";

function Reviews() {
  const { currentMovie } = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(10);
  const [page, setPage] = useState(1);

  const { width, height } = useWindow();

  function getLimit() {
    if (width >= 1200) return 3;
    if (width >= 650) return 2;
    if (width < 650) return 1;
  }

  const limit = getLimit();

  useEffect(
    function () {
      const fetchReviews = async function () {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.kinopoisk.dev/v1.4/review?page=${page}&limit=${limit}&movieId=${currentMovie.id}`,
            {
              method: "GET",
              headers: {
                "X-API-KEY": process.env.REACT_APP_TOKEN,
              },
            }
          );
          const data = await res.json();
          setReviews(data.docs);
          // console.log(data.total);
          setTotalReviews(data.total);
        } catch {
          throw new Error();
        } finally {
          setIsLoading(false);
        }
      };

      fetchReviews();
    },
    [page, limit]
  );

  function handleChangePage(page) {
    setPage(page);
  }

  return (
    <section>
      <h1 className="primary">Отзывы</h1>
      <Row gutter={16} style={{ margin: "1.8rem 0" }}>
        {reviews.map((review) => (
          <Review review={review} limit={limit} key={review.id} />
          // <Col span={8} key={review.id}>
          //   <Card
          //     title={review.title}
          //     bordered={false}
          //     // extra={<span style={{ backgroundColor: "green" }}>8</span>}
          //   >
          //     <p style={{ width: "100%" }}>
          //       {review.review.slice(0, 255)}...{" "}
          //       <button
          //         style={{
          //           backgroundColor: "transparent",
          //           border: "none",
          //           color: "blue",
          //           cursor: "pointer",
          //         }}
          //       >
          //         Смотреть целиком
          //       </button>
          //     </p>
          //   </Card>
          // </Col>
        ))}
      </Row>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalReviews}
          showSizeChanger={false}
          onChange={handleChangePage}
        />
      </div>
    </section>
  );
}

export default Reviews;
