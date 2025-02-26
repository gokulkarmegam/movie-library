import React, { useEffect, useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router";
import Banner from "./components/Banner";
import MovieCard from "./components/MovieCard";
import { Context } from "./Context/Context";

function App() {
  const [watchList, setWatchList] = useState([]);

  let handleWL = (movie) => {
    let newWatchList = [...watchList, movie];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log("newWatchList",newWatchList);
  };

  function handleRFW(movie) {
    var filteredWl = watchList.filter((m) => {
      return m.id != movie.id;
    });
    localStorage.setItem("moviesApp", JSON.stringify(filteredWl));
    setWatchList(filteredWl);
    console.log("filteredWl",filteredWl);
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, [MovieCard]);

  

  return (
    <>
    <Context.Provider value={{watchList,setWatchList,handleWL,handleRFW}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies/>
              </>
            }
          />

          <Route
            path="/Watchlist"
            element={
              <WatchList  />
            }
          />
        </Routes>

      </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
