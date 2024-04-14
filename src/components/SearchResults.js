import React from "react";
import Movie from "./Movie";
import { useSearch } from "../context/SearchProvider";
import { Input, Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import useWindow from "../hooks/useWindow";

function SearchResults() {
  const { movies, isLoading, totalMovies } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();

  function handlePagination(page, pageSize) {
    const params = Object.fromEntries(searchParams);
    const updatedParams = {
      ...params,
      limit: pageSize,
      page: page,
    };
    setSearchParams(updatedParams);

    // console.log(page, pageSize);
  }
  return (
    <main>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <>
          <section style={{ margin: "0 3.2rem" }}>
            {movies.length === 0 ? null : (
              <h1 className="primary">Результаты поиска</h1>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3%" }}>
              {movies.map((movie) => (
                <Movie movie={movie} key={movie.id} />
              ))}
            </div>
          </section>
          {movies.length === 0 ? null : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={searchParams.get("page") || 1}
                pageSize={searchParams.get("limit") || 10}
                showSizeChanger
                total={totalMovies}
                onChange={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default SearchResults;
