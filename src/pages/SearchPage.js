import React from "react";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";

function SearchPage() {
  // const [test, setTest] = useUrlP
  // const [year, setYear] = useState("");
  // setSearchParams({ year: "2004", country: "Германия" });

  // function handleInputOne(e) {
  //   setYear(e.target.value);
  //   setSearchParams({ year: e.target.value });
  // }

  return (
    <>
      {/* <input value={year} onChange={handleInputOne} /> */}
      {/* <button
        onClick={() => setSearchParams({ year: "2004", country: "Германия" })}
      >
        Click
      </button> */}
      <Header />
      <SearchResults />
    </>
  );
}

export default SearchPage;
