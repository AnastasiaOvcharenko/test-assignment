import React, { useEffect, useState } from "react";
import { fetchWithToken, useSearch } from "../context/SearchProvider";
import useDebounce from "../hooks/useDebounce";
import { Input, Tabs } from "antd";
import FiltersForm from "./FiltersForm";
import { useSearchParams } from "react-router-dom";

function Header() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { dispatch } = useSearch();

  useEffect(
    function () {
      const fetchMovies = async function () {
        const url = searchParams.get("query")
          ? `movie/search?page=${
              searchParams.get("page") ? searchParams.get("page") : 1
            }&limit=${
              searchParams.get("limit") ? searchParams.get("limit") : 10
            }&query=${searchParams.get("query")}`
          : `movie?page=${
              searchParams.get("page") ? searchParams.get("page") : 1
            }&limit=${
              searchParams.get("limit") ? searchParams.get("limit") : 10
            }${
              searchParams.get("year")
                ? `&year=${searchParams.get("year")}`
                : ""
            }${
              searchParams.get("ageRating")
                ? `&ageRating=${searchParams.get("ageRating")}`
                : ""
            }${
              searchParams.get("country")
                ? `&countries.name=${searchParams.get("country")}`
                : ""
            }`;

        dispatch({ type: "loading" });
        try {
          const data = await fetchWithToken(`v1.4/${url}`);
          dispatch({ type: "movies/loaded", payload: data });
        } catch {
          dispatch({
            type: "rejected",
          });
        }
      };

      (searchParams.get("query") ||
        searchParams.get("year") ||
        searchParams.get("country") ||
        searchParams.get("ageRating")) &&
        fetchMovies();
    },
    [searchParams]
  );

  useEffect(
    function () {
      if (debouncedSearch) {
        searchParams.delete("year");
        searchParams.delete("ageRating");
        searchParams.delete("country");
        setSearchParams({
          query: debouncedSearch,
        });
      }
    },
    [debouncedSearch]
  );

  return (
    <header
      style={{
        margin: "2.4rem 0",
      }}
    >
      <Tabs
        defaultActiveKey="1"
        style={{ width: "100%" }}
        centered
        items={[
          {
            label: <span style={{ color: "white" }}>Поиск по названию</span>,
            key: 1,
            children: (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Input
                  style={{
                    border: "none",
                    width: "50%",
                    borderRadius: "20px",
                    height: "4.2rem",
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Введите запрос..."
                />
              </div>
            ),
          },
          {
            label: <span style={{ color: "white" }}>Фильтрация фильмов</span>,
            key: 2,
            children: <FiltersForm />,
          },
        ]}
      />
    </header>
  );
}

export default Header;
