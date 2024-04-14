import React, { useEffect, useState } from "react";
import { useSearch } from "../context/SearchProvider";
import { Input, Tabs } from "antd";
import Episodes from "./Episodes";

function Seasons() {
  const { currentMovie } = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [totalSeasons, setTotalSeasons] = useState([]);

  //   console.log(totalSeasons);
  //   console.log(totalEpisodes)

  useEffect(function () {
    const fetchTotalSeasons = async function () {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.kinopoisk.dev/v1.4/season?page=1&limit=250&movieId=${currentMovie.id}
            `,
          {
            method: "GET",
            headers: {
              "X-API-KEY": process.env.REACT_APP_TOKEN,
            },
          }
        );
        const data = await res.json();
        setTotalSeasons(data.total);
      } catch {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalSeasons();
  }, []);

  return (
    <section style={{ margin: "4.2rem 0" }}>
      <h1 className="primary">Сезоны и эпизоды</h1>
      <Tabs
        defaultActiveKey="1"
        style={{ width: "100%", margin: "1.2rem 0" }}
        centered
        items={new Array(totalSeasons).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Сезон ${id}`,
            key: id,
            children: <Episodes season={i + 1} />,
          };
        })}
      />
    </section>
  );
}

export default Seasons;
