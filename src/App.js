import React, { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import { getToken } from "./env";

const query = "napola";

const App = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(
    function () {
      const fetchMovies = async function () {
        const res = await fetch(
          ` https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${debouncedSearch}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": getToken(),
            },
          }
        );
        const data = await res.json();
        console.log(data.docs);
      };
      debouncedSearch && fetchMovies();
    },
    [debouncedSearch]
  );
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    ></input>
  );
};

export default App;
