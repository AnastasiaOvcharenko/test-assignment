import React from "react";
import Movie from "./Movie";
import { useSearch } from "../context/SearchProvider";

function SearchResults() {
  const { movies, isLoading } = useSearch();
  // console.log(movies);
  return (
    <main>
      <section className="searchResults">
        <h1 className="searchResultsPrimary">Результаты поиска</h1>
        <div className="searchResultsContainer">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            movies.map((movie) => <Movie movie={movie} key={movie.id} />)
          )}
        </div>
      </section>
    </main>
  );
}

export default SearchResults;
