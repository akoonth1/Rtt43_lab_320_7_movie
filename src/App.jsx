import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './assets/components/Form'
import MovieDisplay from './assets/components/MovieDisplay'

function App() {

  // Constant with your API Key
  const apiKey = "97b8abb0";

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async(searchTerm) => {
    if (searchTerm.startsWith("tt")) {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${searchTerm}`
        );
        const data = await response.json();
        setMovie(data);
      } catch(e) {
        console.error(e)
      }
    }
    else {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch(e) {
      console.error(e)
    }
  }}
  // We pass the getMovie function as a prop called moviesearch



    // This will run on the first render but not on subsquent renders
    useEffect(() => {
      
      let randomMovies = 'tt'+ Math.floor(Math.random() * 10000000);
      console.log(randomMovies)
      getMovie(randomMovies);
    }, []);
  
  return (
    <>
      <div>
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
      </div>

    </>
  )
}

export default App
