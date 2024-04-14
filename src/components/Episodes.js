import React, { useEffect, useState } from "react";
import { useSearch } from "../context/SearchProvider";
import { Card, Col, Row, Pagination } from "antd";

function Episodes({ season }) {
  const { currentMovie } = useSearch();
  const [episodes, setEpisodes] = useState([]);
  //   const [totalEpisodes, setTotalEpisodes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(function () {
    const fetchEpisodes = async function () {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.kinopoisk.dev/v1.4/season?page=${page}&limit=3&movieId=${currentMovie.id}&number=${season}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": process.env.REACT_APP_TOKEN,
            },
          }
        );
        const data = await res.json();
        setEpisodes(data.docs[0].episodes);
        console.log(data.docs[0].episodes);
        //   setTotalEpisodes(data.total);
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
              (ep) => ep.number >= (page - 1) * 3 + 1 && ep.number <= page * 3
            )
            .map((ep) => (
              <Col span={8}>
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
