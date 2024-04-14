import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import PageNotFound from "./pages/PageNotFound";
import { SearchProvider } from "./context/SearchProvider";
import { ConfigProvider, theme } from "antd";

// const query = "napola";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<SearchPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </ConfigProvider>
  );
};

export default App;
