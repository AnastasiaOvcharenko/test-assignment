import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import PageNotFound from "./pages/PageNotFound";
import { SearchProvider } from "./context/SearchProvider";
import { ConfigProvider, theme } from "antd";
import { AuthProvider } from "./context/FakeAuthContext";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import RandomMovie from "./components/RandomMovie";

// const query = "napola";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <AuthProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<SearchPage />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/auth" element={<Auth />} />

              <Route
                path="/random"
                element={
                  <ProtectedRoute>
                    <RandomMovie />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
