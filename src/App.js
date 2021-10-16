import React, {useState,useEffect} from 'react';
import {Main} from './components';
import './App.css'
import {useMovies} from './contexts/MoviesContext';

const App = () => {

  const [titulo, setTitulo] = useState('')
  

  const {getMovies } = useMovies()

  useEffect(() =>{
    getMovies('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'); // eslint-disable-next-line
    setTitulo('Top Movies')// eslint-disable-next-line
},[]) 

  return ( 
    <>
      <Main 
          titulo={titulo}  
          setTitulo={setTitulo}
        />
      </>
   );
}
 
export default App;