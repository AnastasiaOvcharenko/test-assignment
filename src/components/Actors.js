import React, { useEffect, useState } from "react";
import { Pagination, Card, Col, Row } from "antd";
import { useSearch } from "../context/SearchProvider";
import useWindow from "../hooks/useWindow";
function Actors() {
  const { currentMovie } = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [actors, setActors] = useState([]);
  const [totalActors, setTotalActors] = useState(8);
  const [page, setPage] = useState(1);
  const { Meta } = Card;
  const { width, height } = useWindow();

  function getLimit() {
    if (width >= 1200) return 6;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    if (width < 480) return 1;
  }

  const limit = getLimit();

  useEffect(
    function () {
      const fetchActors = async function () {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.kinopoisk.dev/v1.4/person?page=${page}&limit=${limit}&movies.id=${currentMovie.id}&movies.enProfession=actor`,
            {
              method: "GET",
              headers: {
                "X-API-KEY": process.env.REACT_APP_TOKEN,
              },
            }
          );
          const data = await res.json();
          setActors(data.docs);
          setTotalActors(data.total);
        } catch {
          throw new Error();
        } finally {
          setIsLoading(false);
        }
      };

      fetchActors();
    },
    [page, limit]
  );

  function handleChangePage(page) {
    setPage(page);
  }

  // }
  return (
    <div style={{ margin: "3.6rem 0" }}>
      <section style={{ margin: "6.4rem 0" }}>
        <h1 className="primary">Список актёров</h1>
        <Row gutter={16} style={{ margin: "2.4rem" }}>
          {actors.length &&
            actors.map((person) => (
              <Col span={24 / limit}>
                <Card
                  cover={
                    <div
                      style={{
                        height: "40vh",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={
                          person.photo ||
                          "https://st.kp.yandex.net/images/no-poster.gif"
                        }
                        alt={person.name || person.enName}
                      />
                    </div>
                  }
                >
                  <Meta title={person.name || person.enName} />
                </Card>
              </Col>
            ))}
        </Row>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            current={page}
            pageSize={24 / limit}
            total={totalActors}
            showSizeChanger={false}
            onChange={handleChangePage}
          />
        </div>
      </section>
    </div>
  );
}

export default Actors;
