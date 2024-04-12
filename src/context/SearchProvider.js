import React, { createContext, useContext, useReducer, useState } from "react";

const SearchContext = createContext();

const initialState = {
  movies: [],
  query: "",
  isLoading: false,
  resultsPerPage: 10,
  currentMovie: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "movies/loaded":
      return { ...state, movies: action.payload, isLoading: false };
    case "movieData/loaded":
      return { ...state, currentMovie: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false };
  }
}

function SearchProvider({ children }) {
  const [
    { movies, query, isLoading, resultsPerPage, error, currentMovie },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider
      value={{
        movies,
        query,
        isLoading,
        resultsPerPage,
        dispatch,
        error,
        currentMovie,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error("Контекст использован вне его провайдера");
  return context;
}

export { useSearch, SearchProvider };