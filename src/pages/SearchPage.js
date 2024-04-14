import React from "react";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import Navbar from "../components/Navbar";

function SearchPage() {
  return (
    <>
      <Navbar />
      <Header />
      <SearchResults />
    </>
  );
}

export default SearchPage;
