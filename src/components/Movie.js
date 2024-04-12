import React from "react";
import { useNavigate } from "react-router-dom";

// {
//     "internalNames": [
//         "Звероферма",
//         "Animal Farm",
//         "Kammerat Napoleon",
//         "La revolta dels animals",
//         "Aufstand der Tiere - Animal Farm",
//         "Hofstaat der Tiere",
//         "Abereen etxaldea",
//         "动物庄园",
//         "Η φάρμα των ζώων",
//         "Rebelión en la Granja",
//         "Скотный двор"
//     ],
//     "name": "Звероферма",
//     "alternativeName": "Animal Farm",
//     "enName": "",
//     "year": 1954,
//     "genres": [
//         {
//             "name": "мультфильм"
//         },
//         {
//             "name": "драма"
//         }
//     ],
//     "countries": [
//         {
//             "name": "Великобритания"
//         },
//         {
//             "name": "США"
//         }
//     ],
//     "releaseYears": [],
//     "id": 79901,
//     "names": [
//         {
//             "name": "Звероферма"
//         },
//         {
//             "name": "Animal Farm"
//         },
//         {
//             "name": "Kammerat Napoleon",
//             "language": "DK",
//             "type": null
//         },
//         {
//             "name": "La revolta dels animals",
//             "language": "AD",
//             "type": null
//         },
//         {
//             "name": "Aufstand der Tiere - Animal Farm",
//             "language": "DE",
//             "type": null
//         },
//         {
//             "name": "Hofstaat der Tiere",
//             "language": "DE",
//             "type": null
//         },
//         {
//             "name": "Abereen etxaldea",
//             "language": "ES",
//             "type": "Euskera"
//         },
//         {
//             "name": "动物庄园",
//             "language": "CN",
//             "type": null
//         },
//         {
//             "name": "Η φάρμα των ζώων",
//             "language": "GR",
//             "type": null
//         },
//         {
//             "name": "Rebelión en la Granja",
//             "language": "ES",
//             "type": null
//         },
//         {
//             "name": "Скотный двор",
//             "language": "RU",
//             "type": null
//         }
//     ],
//     "type": "cartoon",
//     "description": "Когда-то мистер Джонс владел процветающей и доходной фермой, но сейчас его дела шли из рук вон плохо. Из-за невозможности решить свои проблемы мистер Джонс начал злоупотреблять выпивкой.\n\nСреди бедных своих собутыльников он нашел хороших слушателей, которым мог рассказать о своих горестях… Эта необычная история начинается вечером, когда мистер Джонс пришел после очередной попойки позже, чем обычно…",
//     "shortDescription": "",
//     "logo": {
//         "url": null
//     },
//     "poster": {
//         "url": "https://image.openmoviedb.com/kinopoisk-images/1773646/c151858e-8121-4019-bb1d-0d8f7cd71737/orig",
//         "previewUrl": "https://image.openmoviedb.com/kinopoisk-images/1773646/c151858e-8121-4019-bb1d-0d8f7cd71737/x1000"
//     },
//     "backdrop": {
//         "url": "https://image.openmoviedb.com/tmdb-images/original/nZBbVRyNO8uf7M5G0Ux46N9ioNC.jpg",
//         "previewUrl": "https://image.openmoviedb.com/tmdb-images/w500/nZBbVRyNO8uf7M5G0Ux46N9ioNC.jpg"
//     },
//     "rating": {
//         "kp": 7.258,
//         "imdb": 7.2,
//         "filmCritics": 7.2,
//         "russianFilmCritics": 0,
//         "await": null
//     },
//     "votes": {
//         "kp": 2834,
//         "imdb": 18840,
//         "filmCritics": 13,
//         "russianFilmCritics": 0,
//         "await": 0
//     },
//     "movieLength": 72,
//     "isSeries": false,
//     "ticketsOnSale": false,
//     "totalSeriesLength": null,
//     "seriesLength": null,
//     "ratingMpaa": null,
//     "ageRating": 12,
//     "top10": null,
//     "top250": null,
//     "typeNumber": 3,
//     "status": null,
//     "internalRating": 7.258,
//     "internalVotes": 2834,
//     "externalId": {
//         "imdb": "tt0047834",
//         "tmdb": 11848
//     }
// }

function Movie({ movie }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    poster,
    ageRating,
    countries,
    genres,
    year,
    alternativeName,
  } = movie;
  console.log(movie);
  console.log(movie.genres);
  return (
    <div className="searchItem" onClick={() => navigate(`movie/${id}`)}>
      <img
        className="searchItemImg"
        src={poster.url || "https://st.kp.yandex.net/images/no-poster.gif"}
        alt={`Poster`}
      />
      <div className="searchItemInfo">
        <p className="searchItemMainInfo">
          {name || alternativeName}
          <span className="searchItemGenre"> / {genres[0]?.name}</span>
        </p>
        <p className="searchItemAddInfo">
          {ageRating && `${ageRating}+ /`} {year ? year : ""} /{" "}
          {countries[0]?.name}
        </p>
      </div>
    </div>
  );
}

export default Movie;
