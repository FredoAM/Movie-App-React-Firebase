import React,{useEffect} from 'react';
import styled from 'styled-components/macro';
import {Link } from "react-router-dom";
import {useMovies} from './../contexts/MoviesContext';
import {db} from './../firebase/firebaseConfig'
import {Helmet} from 'react-helmet';



const Peliculas = () => {
    

  const { movies, getMovies} = useMovies()

  const saveToLocalStorage = (items) => {
      localStorage.setItem('movie-id', JSON.stringify(items));
    };
  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    
  
    function getClassByRate(vote) {
      if(vote >= 7) {
          return 'green'
      } else if(vote >= 5) {
          return 'orange'
      } else {
          return 'red'
      }
    }

    useEffect(() =>{
        getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&year=2021&with_watch_monetization_types=flatrate');
        // eslint-disable-next-line
        },[]) 
  

    return ( 
      <>
       <Helmet>
          <title>Peliculas</title>
        </Helmet>
        <Container>
          <div className="titulo1" ><h1 >Peliculas</h1></div>

            {movies.map(movie => (
              <Link to={`/Movies/${movie.original_title}`} className='linkOverview' key={movie.id}>
                          <MovieDisplay  onClick={() =>{
                            const newMovie = movie;
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
                                  <h3>Summary</h3>
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
    min-height:100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    a{
      color:black;
    }
    a:visited{
      color:black;
    }

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
    font-family:'Montserrat', sans-serif;
    font-size:15px;
    text-align: justify;
    text-justify: inter-character;

    h3{
      margin-bottom:7px;
    }

`
export const MovieDisplay = styled.div`
    width: 300px;
    background-color: #1e1b26;
    margin: 3rem;
    margin-top:5rem;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    max-height: 540px;
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
    padding: .5rem 1rem 1rem;
  
    h3{
      padding:5px;
      color:white;
      font-family:'Montserrat', sans-serif;
    }

    span{
    background-color: #222831;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    font-weight: bold;
    margin-left:5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

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

export default Peliculas;