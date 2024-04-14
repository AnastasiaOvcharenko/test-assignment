import React, { useEffect, useState } from "react";
import { fetchWithToken, useSearch } from "../context/SearchProvider";
import useDebounce from "../hooks/useDebounce";
import { Input, Tabs } from "antd";
import FiltersForm from "./FiltersForm";
import { useSearchParams } from "react-router-dom";

function Header() {
  let [searchParams, setSearchParams] = useSearchParams();
  // https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&year=2004-2005&ageRating=12-18&countries.name=%21%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D0%B8%D1%8F
  // query дебаунсом записывать в searchParams, считывать оттуда и выполнять запрос
  // pageNum и pageLimit также записывать в searchParams
  // ageRating, countries.name, year записывать в searchParams при выполнении формы, превентив дефолт
  // при изменении searchParams (скорее всего в эффекте) фетчить новый запрос

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { dispatch } = useSearch();

  // setSearchParams({ limit: 20 });

  useEffect(
    function () {
      const fetchMovies = async function () {
        const url = searchParams.get("query")
          ? `movie/search?page=${
              searchParams.get("page") ? searchParams.get("page") : 1
            }&limit=${
              searchParams.get("limit") ? searchParams.get("limit") : 10
            }&query=${debouncedSearch || searchParams.get("query")}`
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
          const data = await fetchWithToken(url);
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
    [debouncedSearch, searchParams]
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
