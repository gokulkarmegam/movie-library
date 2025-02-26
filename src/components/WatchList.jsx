import React, { useEffect, useState,useContext} from "react";
import genreids from "./utility/genre";
import { Context } from "../Context/Context";

function WatchList() {

  const {watchList,setWatchList} = useContext(Context);

  const [search, setSearch] = useState("");

  const [genreList, setGenreList] = useState(["All Genre's"]);

  const [currentGenre, setCurrentGenre] = useState("All Genre's");

  function deleted(movie) {
    var filteredWl = watchList.filter((m) => {
      return m.id != movie.id;
    });
    localStorage.setItem("moviesApp", JSON.stringify(filteredWl));
    setWatchList(filteredWl);
    //console.log(filteredWl);
  }

  function handleSelectedGenre(genre) {
    setCurrentGenre(genre);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function sortDecrease() {
    let sortedIncrease = watchList.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedIncrease]);
  }

  function sortIncrease() {
    let sortedDecrease = watchList.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDecrease]);
  }

  function sortpDecrease() {
    let sortedpIncrease = watchList.sort((movieX, movieY) => {
      return movieX.popularity - movieY.popularity;
    });
    setWatchList([...sortedpIncrease]);
  }

  function sortpIncrease() {
    let sortedpDecrease = watchList.sort((movieX, movieY) => {
      return movieY.popularity - movieX.popularity;
    });
    setWatchList([...sortedpDecrease]);
  }



  useEffect(() => {
    let getgenres = watchList.map((movie) => {
      //console.log(genreids[movie.genre_ids[0]])
      return genreids[movie.genre_ids[0]];
    });
    getgenres = new Set(getgenres);
    console.log(getgenres);
    setGenreList(["All Genre's", ...getgenres]);
  }, [watchList]);

  console.log(genreList);

  return (
    <>
      <div className="flex justify-center mt-5">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleSelectedGenre(genre)}
              className={
                currentGenre == genre
                  ? "flex items-center  justify-center h-[7vh] w-[28vh] bg-blue-400 rounded-lg text-white text-xl mx-4"
                  : "flex items-center  justify-center h-[7vh] w-[28vh] bg-gray-400 rounded-lg text-white text-xl mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-5">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="search movies..."
          className="h-[7vh] w-[50vh] bg-gray-200 rounded px-4 mx-3"
        />
      </div>

      <div className=" flex justify-center items-center overflow-hidden rounded-xl border border-gray-300 m-8">
        <table className="w-full text-center text-gray-500">
          <thead className="  border-b-2 border-gray-400">
            <tr>
              <th>Name</th>
              <th className="flex justify-center items-center ">
                <div className="m-2" onClick={sortpDecrease}>
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
                <div>Popularity</div>
                <div className="m-2" onClick={sortpIncrease}>
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
              </th>
              <th> Genre </th>
              <th className="flex justify-center items-center ">
                <div className="m-2" onClick={sortDecrease}>
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
                <div>Rating</div>
                <div className="m-2" onClick={sortIncrease}>
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {watchList
              .filter((movie) => {
                if (currentGenre == "All Genre's") {
                  return true;
                } else {
                  return genreids[movie.genre_ids[0]] == currentGenre;
                }
              })
              .filter((movie) => {
                return movie.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movie) => {
                return (
                  <tr className="text-xl  ">
                    <td className="flex items-center px-10 py-3 ">
                      <img
                        className="h-[15vh] w-[10vh]"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      />
                      <div className="mx-5 text-black">{movie.original_title}</div>
                    </td>

                    <td> {Math.floor(movie.popularity)} </td>
                    <td>{genreids[movie.genre_ids[0]]}</td>
                    <td> {movie.vote_average} </td>
                    <td onClick={() => deleted(movie)} className=" text-red-500 pr-4 ">
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
