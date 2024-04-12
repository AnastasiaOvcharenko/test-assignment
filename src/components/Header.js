import React, { useEffect, useState } from "react";
import { getToken } from "../env";
import { useSearch } from "../context/SearchProvider";
import useDebounce from "../hooks/useDebounce";
import { Input } from "antd";
import FiltersForm from "./FiltersForm";
import FiltersFormOld from "./FiltersFormOld";
import { useSearchParams } from "react-router-dom";

function Header() {
  let [searchParams, setSearchParams] = useSearchParams();
  // https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&year=2004-2005&ageRating=12-18&countries.name=%21%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D0%B8%D1%8F
  // query дебаунсом записывать в searchParams, считывать оттуда и выполнять запрос
  // pageNum и pageLimit также записывать в searchParams
  // ageRating, countries.name, year записывать в searchParams при выполнении формы, превентив дефолт
  // при изменении searchParams (скорее всего в эффекте) фетчить новый запрос

  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] = useState("false");
  const debouncedSearch = useDebounce(search);
  const { dispatch } = useSearch();

  useEffect(
    function () {
      const fetchMovies = async function () {
        dispatch({ type: "loading" });
        try {
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
          dispatch({ type: "movies/loaded", payload: data.docs });
        } catch {
          dispatch({
            type: "rejected",
          });
        }
      };
      debouncedSearch && fetchMovies();
    },
    [debouncedSearch]
  );

  return (
    <header className="header">
      <Input
        // prefix={<ion-icon class="searchIcon" name="search-outline"></ion-icon>}
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        style={{ padding: "0 2.4rem" }}
        placeholder="Введите запрос..."
      />
      <button onClick={() => setShowFilters((s) => !s)}>
        Установить фильтры
      </button>
      {showFilters && <FiltersForm />}
      {/* <FiltersFormOld /> */}
    </header>
  );
}

export default Header;
