import React,{useEffect} from 'react';
import styled from 'styled-components/macro';
import {Link } from "react-router-dom";
import {useMovies} from './../contexts/MoviesContext';
import {db} from './../firebase/firebaseConfig'
import {Helmet} from 'react-helmet';

const Search = () => {

    const { movies, getSearchMovies } = useMovies()

    const searchQuery = JSON.parse(localStorage.getItem('search-query'));
    const saveToLocalStorage = (items) => {
        localStorage.setItem('movie-id', JSON.stringify(items));
      };
    
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    useEffect(() =>{
      getSearchMovies(searchQuery);// eslint-disable-next-line
      },[searchQuery]) 

      
      function getClassByRate(vote) {
        if(vote >= 7) {
            return 'green'
        } else if(vote >= 5) {
            return 'orange'
        } else {
            return 'red'
        }
    }



    return ( 
        <>
         <Helmet>
          <title>Search: {searchQuery}</title>
        </Helmet>
          <Container>
            {/* <div className="titulo1"><h1 >{titulo}</h1></div> */}

              {movies.map(movie => (
                <Link to={`/Movies/${movie.original_title}`} className='linkOverview' key={movie.id}>
                            <MovieDisplay  onClick={() =>{
                              const newMovie = movie;
                              // setIdMovie(newMovie,console.log(newMovie));
                              saveToLocalStorage(newMovie)
                                const docRef = db.collection('movies').doc(newMovie.title)
                                docRef.get().then(
                                doc => {
                                  if (doc.exists) {
                                    return
                                  }else{
                                    db.collection("movies").doc(newMovie.title).set(newMovie);
                                  }
                                });
                              }}>
                          
                            <img src={IMG_PATH + movie.poster_path} alt={movie.title}/>
                            <MovieHeader>
                                    <h3>{movie.title}</h3>
                                    <VoteAve getClassByRate={getClassByRate(movie.vote_average)}>{movie.vote_average}</VoteAve>
                            </MovieHeader>
                                <Overview>
                                    <h3>Overview</h3>
                                    {movie.overview}
                                </Overview> 
                            </MovieDisplay> 
                </Link>
              ))}
          </Container>
        </>
     );
}

export const VoteAve = styled.span`
  color: ${props => 
    props.getClassByRate}
`

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

`
export const Overview = styled.div`
    background-color: #fff;
    padding: 2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    max-height: 100%;
    transform: translateY(101%);
    overflow-y: auto;
    transition: transform 0.3s ease-in;

   
`
export const MovieDisplay = styled.div`
    width: 300px;
    background-color: green;
    margin: 3rem;
    margin-top:5rem;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    max-height: 500px;
    cursor: pointer;
    

    img{
        width: 100%
    }
 
    &:hover ${Overview}{
    transform: translateY(0);
    cursor: pointer;
  }
`

export const MovieHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem 1rem;
  
    h3{
      
      color:white;
    }

    span{
    background-color: #22254b;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    font-weight: bold;

    span.red {
    color: red;
  }

    span.orange {
    color: orange;
  }
    span.green {
    color: lightgreen;
  }
}
`
 
export default Search;