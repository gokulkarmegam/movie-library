import MovieCard from "./MovieCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  function next() {
    setPageNo(pageNo + 1);
  }

  function prev() {
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=6bbea2bb36e191462146fe54c6dee6aa&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results), console.log(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-2 ">
      <div className="font-sans font-medium text-center text-2xl">Movies on Trend</div>
      <div className="flex justify-normal flex-row flex-wrap ">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              movie_poster_path={movie.poster_path}
              movie_title={movie.title}
            />
          );
        })}
      </div>
      <Pagination prev={prev} next={next} pageNo={pageNo} />
    </div>
  );
}

export default Movies;
