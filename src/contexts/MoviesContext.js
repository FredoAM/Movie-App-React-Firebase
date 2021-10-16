import React, { useContext, useState} from "react"


// Creamos el contexto;
const MoviesContext = React.createContext();

// Hook para acceder al contexto
const useMovies =  () => useContext(MoviesContext);


const MoviesProvider = ({children}) => {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  

  const getMovies = async (url) =>{
    const res = await fetch(url)
    const data = await res.json()
    
    const datos = data.results;
    datos.length = 9;
    
      setMovies(datos);
      console.log(datos)
  };

  async function getSearchMovies(searchValue) {
    try{
      const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&query=${searchValue}&page=1&include_adult=false`)
      const data = await res.json()
      const datos = data.results;
      setMovies(datos);}
    catch(e){
      console.log(e, 'error')
    }
  }

  const moviesId = JSON.parse(localStorage.getItem('movie-id'));



  const value = {
    movies,
    getSearchMovies,
    getMovies,
    setSearchValue,
    searchValue,
    moviesId
  }

  


  
  

	return (
		<MoviesContext.Provider value={value}>
			{children}
		</MoviesContext.Provider>
	);
}
 
export {MoviesProvider, MoviesContext, useMovies};