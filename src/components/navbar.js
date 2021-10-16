import React, {useState, useRef} from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserCircle, faSignOutAlt, faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { NavLink, useHistory, Link } from 'react-router-dom'
import {useMovies} from './../contexts/MoviesContext';
import {useAuth} from './../contexts/AuthContext';
import {auth} from './../firebase/firebaseConfig';
import logo from './../imagenes/fenix.png'


const NavBar = () => {

    const [state, setState] = useState(true)
    const { getSearchMovies,searchValue,setSearchValue } = useMovies()
    const {user} = useAuth();

    const searchInput = useRef(null)
    const SlideInput = e =>{
        e.preventDefault();
        setState(!state);
        searchInput.current.focus()
    }
    const saveToLocalStorage = (items) => {
        localStorage.setItem('search-query', JSON.stringify(items));
      };

    const searchQuery = JSON.parse(localStorage.getItem('search-query'));

    const history = useHistory();
    const handleBlur = e =>{
        setState(!state)
    
    }

    const SearchPage = (e) =>{
        e.preventDefault();
        if(searchValue){
            saveToLocalStorage(searchValue)
            getSearchMovies(searchQuery);
            history.push(`/Search/query=${searchValue}`)
            console.log(searchValue)
        }
        
    }

    const SignOut = () =>{
        auth.signOut()
        history.push('/')
    }

    return ( 
        <Container>
            <div className="logo-icon-name">
                <Link to="/"><img src={logo} alt="Logo" /></Link>
                <Link to="/"><Logo >FENIX+</Logo></Link>
            </div>
            
            <MenuNav className="menu-nav">
                <NavLink to="/Series" title="Series">Series</NavLink>
                <NavLink to="/Peliculas" title="Peliculas">Peliculas</NavLink>
                <NavLink to="/" title="Generos">Generos</NavLink>
            </MenuNav>

            <IconosNav className="iconos-nav" >
                <form className={state ? 'active' : null} id="form" onSubmit={SearchPage}>
                <span className="icon"> <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon></span>
                    <Search 
                        type="text"  
                        placeholder=" Titulo, Peliculas, Series..."
                        value={searchValue}
				        onChange={(event) => setSearchValue(event.target.value)}
                        onBlur={handleBlur}
                        ref={searchInput}
                    />
                </form>
                <span 
                    className='icon2'
                    onClick={SlideInput}
                    title="Buscar"
                ><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></span>
                {user ? 
                <>
                <a className='icon2' href='/Perfil' title="Perfil"><FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon></a>
                <span className='icon2' onClick={SignOut}><FontAwesomeIcon icon={faSignOutAlt} title="Log Out"></FontAwesomeIcon></span>
                </> :
                <a className='icon2' href='/iniciar-sesion'><FontAwesomeIcon icon={faSignInAlt} title="Log In"></FontAwesomeIcon></a>}
                
            </IconosNav>
        </Container>
     );
};
 

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background-color: #222831;

    img{
        width:60px;
        margin-left:10px;
    }
    a{
        text-decoration:none;
    }
    a:visited{
        color:white;
    }
`


export const IconosNav = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    color:white;
`


export const MenuNav = styled.ul`
    display: flex;
    list-style: none;
    gap: 20px;
    height:100%;
    align-items:center;
    
    a{
        display:flex;
        color:white;
        text-decoration:none;
        height:100%;
        align-items:center;
        padding:20px;
        text-transform: uppercase;
        
         
    }
    a:hover{
        color: black;
        cursor: pointer;
        background-color:#f8da5b;
        
    }
  
    

    
`

export const Search = styled.input`
    width: 220px;
    outline: none;
    padding-left: 5px;
    height:30px;
    
    `
export const Logo = styled.div`
    color: white;
    font-size: 40px;
    font-family: 'Rubik', sans-serif;
    font-weight:700;
    margin: 10px 15px;
    
    &:hover{
        color: #f8da5b;
        cursor: pointer;
    }
  
`




export default NavBar;

