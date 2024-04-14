import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonNext, ButtonPrev } from "./SliderButtons";
import { fetchWithToken } from "../context/SearchProvider";
function Posters({ firstPosterUrl }) {
  const { id } = useParams();
  const [posters, setPosters] = useState([{ url: firstPosterUrl, id: 1 }]);
  const [curImg, setCurImg] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    let temporaryPosters = [{ url: firstPosterUrl, id: 1 }];
    let totalPosters;
    const fetchPosters = async function (page) {
      try {
        setIsLoading(true);
        const data = await fetchWithToken(
          `v1.4/image?page=${page}&limit=250&selectFields=url&movieId=${id}`
        );
        const postersArray = data.docs;
        totalPosters = data.total;
        temporaryPosters.push(...postersArray);
      } catch (err) {
        throw new Error("Error fetching posters: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    async function getAllPosters() {
      await fetchPosters(1);
      for (let i = 2; temporaryPosters.length < totalPosters; i++) {
        await fetchPosters(i);
      }
    }

    getAllPosters();
    setPosters(temporaryPosters);
  }, []);

  function handleNext() {
    curImg !== posters.length - 1 && setCurImg((cur) => cur + 1);
  }
  function handlePrev() {
    curImg !== 0 && setCurImg((cur) => cur - 1);
  }

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
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
                style={{
                  height: "auto",
                  width: "auto",
                  maxWidth: "100%",
                  maxHeight: "25vw",
                  alignSelf: "center",
                }}
              />
            </div>
          ))}
        </div>

        <ButtonPrev handleClick={handlePrev} />
        <ButtonNext handleClick={handleNext} />
      </section>
    </>
  );
}

export default Posters;
