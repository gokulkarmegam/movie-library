import React, { useContext } from "react";
import { Context } from "../Context/Context";

function MovieCard({
  movie_poster_path,
  movie_title,
  movie,
}) {

  const {watchList,handleWL,handleRFW} = useContext(Context);

  function doesContain(movie) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id == movie.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="flex items-end justify-between flex-col m-5 h-[40vh] w-[20vh] bg-cover bg-center
       rounded-xl hover:cursor-pointer
       hover:scale-110 duration-400"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie_poster_path})`,
      }}
    >
      {doesContain(movie) ? (
        <div
          onClick={() => handleRFW(movie)}
          className="flex justify-center m-2 bg-gray-900/50 rounded
         hover:cursor-pointer hover:scale-110 hover:bg-white 
         duration-200"
        >
          &#x26D4;
        </div>
      ) : (
        <div
          onClick={() => handleWL(movie)}
          className="flex justify-center m-2 bg-gray-900/50
         rounded hover:cursor-pointer hover:scale-110 hover:bg-white duration-200 "
        >
          &#128512;
        </div>
      )}

      <div className="text-white text-1xl w-full text-center p-2 bg-gray-900/50 ">
        {movie_title}
      </div>
    </div>
  );
}

export default MovieCard;
