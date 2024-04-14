import React, { useEffect, useState } from "react";
import { Card, Col, Row, Pagination } from "antd";
import { fetchWithToken, useSearch } from "../context/SearchProvider";
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
          const data = await fetchWithToken(
            `v1.4/review?page=${page}&limit=${limit}&movieId=${currentMovie.id}`
          );
          setReviews(data.docs);
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

  if (reviews.length === 0)
    return <h1 className="primary">Отзывы отсутствуют</h1>;

  return (
    <section style={{ margin: "6rem 0" }}>
      <h1 className="primary">Отзывы</h1>
      <Row gutter={16} style={{ margin: "1.8rem 0" }}>
        {reviews.map((review) => (
          <Review review={review} limit={limit} key={review.id} />
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
