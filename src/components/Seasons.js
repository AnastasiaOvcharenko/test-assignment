import React, { useEffect, useState } from "react";
import { fetchWithToken, useSearch } from "../context/SearchProvider";
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
        const data = await fetchWithToken(
          `season?page=1&limit=250&movieId=${currentMovie.id}`
        );
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
    <section style={{ margin: "6rem 0" }}>
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
