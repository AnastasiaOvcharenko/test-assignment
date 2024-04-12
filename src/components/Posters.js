import React, { useEffect, useState } from "react";
import { getToken } from "../env";
import { useParams } from "react-router-dom";
function Posters({ firstPosterUrl }) {
  const { id } = useParams();
  const [posters, setPosters] = useState([]);
  const [curImg, setCurImg] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const fetchPosters = async function () {
      // console.log(movieId);
      // if (id)
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.kinopoisk.dev/v1.4/image?page=1&limit=100&selectFields=url&movieId=${id}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": getToken(),
            },
          }
        );
        const data = await res.json();
        const postersArray = data.docs;
        postersArray &&
          setPosters([{ url: firstPosterUrl, id: 1 }, ...postersArray]);
      } catch (err) {
        throw new Error("Error fetching posters: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosters();
  }, []);

  function handleNext() {
    curImg !== posters.length - 1 && setCurImg((cur) => cur + 1);
  }
  function handlePrev() {
    curImg !== 0 && setCurImg((cur) => cur - 1);
  }

  if (isLoading) return <h1>Is loading...</h1>;

  return (
    <>
      <section
        style={{
          position: "relative",
          // marginBottom: "3.6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(-${100 * curImg}vw)`,
            transition: "all 300ms",
          }}
        >
          {posters.map((poster) => (
            <div
              key={poster.id}
              style={{
                width: "100vw",
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  poster.url || "https://st.kp.yandex.net/images/no-poster.gif"
                }
                alt="Poster"
                style={{ height: "60vh" }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            height: "60vh",
            width: "40px",
            fontSize: "3.2rem",
            color: "white",
            top: 0,
            left: 0,
            opacity: 0.6,
            border: "none",
            backgroundColor: "#51514E",
            cursor: "pointer",
          }}
        >
          {"<"}
        </button>
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            height: "60vh",
            width: "40px",
            fontSize: "3.2rem",
            color: "white",
            top: 0,
            right: 0,
            opacity: 0.6,
            border: "none",
            backgroundColor: "#51514E",
            cursor: "pointer",
          }}
        >
          {">"}
        </button>
      </section>
    </>
  );
}

export default Posters;
