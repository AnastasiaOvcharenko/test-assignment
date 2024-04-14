import React, { useEffect, useState } from "react";
import { fetchWithToken, useSearch } from "../context/SearchProvider";
import { Card, Col, Row, Pagination } from "antd";
import useWindow from "../hooks/useWindow";

function Episodes({ season }) {
  const { currentMovie } = useSearch();
  const [episodes, setEpisodes] = useState([]);
  //   const [totalEpisodes, setTotalEpisodes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // console.log(currentMovie);
  const { width, height } = useWindow();

  function getLimit() {
    if (width >= 1200) return 4;
    if (width >= 950) return 3;
    if (width >= 650) return 2;
    if (width < 650) return 1;
  }

  const limit = getLimit();

  useEffect(function () {
    const fetchEpisodes = async function () {
      setIsLoading(true);
      try {
        const data = await fetchWithToken(
          `v1.4/season?page=${page}&limit=3&movieId=${currentMovie.id}&number=${season}`
        );
        // console.log(data?.docs[0]);
        setEpisodes(data?.docs[0]?.episodes);
      } catch (err) {
        console.log(err.message);
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  function handleChangePage(page) {
    setPage(page);
  }

  return (
    <div>
      {!isLoading && (
        // <h1>
        //   Сезон {season}, {episodes.length} серий
        // </h1>
        <Row gutter={16} style={{ marginBottom: "1.2rem" }}>
          {episodes
            .filter(
              (ep) =>
                ep.number >= (page - 1) * limit + 1 && ep.number <= page * limit
            )
            .map((ep) => (
              <Col span={24 / limit} key={ep.number}>
                <Card bordered={false}>
                  <p>
                    Эпизод {ep.number}: {ep.name}
                  </p>
                  <div style={{ height: "25vh" }}>
                    <img
                      src={ep?.still?.previewUrl}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    ></img>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={page}
          pageSize={3}
          total={episodes.length}
          showSizeChanger={false}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default Episodes;
