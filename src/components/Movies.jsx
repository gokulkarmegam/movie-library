import MovieCard from "./MovieCard";
import  { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(() => { 
    return parseInt(localStorage.getItem("pageNo")) || 1;
  });
  const [loading, setLoading] = useState(false);
  console.log(movies);
  function next() {
    setPageNo(pageNo + 1);
  }

  function prev() {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  }
  localStorage.setItem("pageNo", pageNo);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=6bbea2bb36e191462146fe54c6dee6aa&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, [pageNo]);

  return (
    <div className="p-2">
      <div className="font-sans font-medium text-center text-2xl">
      </div>
      {loading ? (
        // Skeleton UI for loading state
        <div className="flex justify-center  flex-row flex-wrap">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="m-2 animate-pulse"
            >
              <div
                className="
                  h-[25vh] w-[12vh] ml-5 mt-2 mb-2
                  md:h-[40vh] md:w-[20vh] md:ml-10 md:mt-8 md:mb-8
                  bg-gray-300 rounded-xl
                "
              ></div>
              <div className="mt-8 bg-gray-300 h-4 w-24 rounded"></div>
              <div className="mt-8 bg-gray-300 h-4 w-20 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        // Actual Movie Content
        <div className="flex  flex-row flex-wrap">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              movie_poster_path={movie.poster_path}
              movie_title={movie.title}
              isLoading={loading}
              movieId={movie.id}
            />
          ))}
        </div>
      )}
      <Pagination prev={prev} next={next} pageNo={pageNo} />
    </div>
  );
}

export default Movies;