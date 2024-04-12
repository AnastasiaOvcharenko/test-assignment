import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useDebounce from "./hooks/useDebounce";
import { getToken } from "./env";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import PageNotFound from "./pages/PageNotFound";
import { SearchProvider } from "./context/SearchProvider";

// const query = "napola";

const App = () => {
  // const [search, setSearch] = useState("");
  // const debouncedSearch = useDebounce(search);

  // useEffect(
  //   function () {
  //     const fetchMovies = async function () {
  //       const res = await fetch(
  //         ` https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${debouncedSearch}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "X-API-KEY": getToken(),
  //           },
  //         }
  //       );
  //       const data = await res.json();
  //       console.log(data.docs);
  //     };
  //     debouncedSearch && fetchMovies();
  //   },
  //   [debouncedSearch]
  // );
  return (
    // <input
    //   type="text"
    //   value={search}
    //   onChange={(e) => setSearch(e.target.value)}
    // ></input>
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SearchPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
