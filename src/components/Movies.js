import React,{useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import {db} from './../firebase/firebaseConfig'
import {useAuth} from './../contexts/AuthContext';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import userPhoto from './../imagenes/userNotSet.jpeg'
import {FaPlus,FaTrash } from "react-icons/fa"
import {Helmet} from 'react-helmet';
import {useHistory} from 'react-router-dom'

const Movies = () => {

    const [moviesDB, setMoviesDB] = useState([]);
    const [datos, setDatos] = useState([]);
    const [textArea, setTextArea] = useState('')
    const {usuario, user} = useAuth();
    const history = useHistory();

    const movies = JSON.parse(localStorage.getItem('movie-id'));
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
  
    
 
    const getMovies = async () => {
        
        const dataID = db.collection("movies").where("id", "==", movies.id)
        dataID.onSnapshot(((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                
                docs.push({...doc.data()});
            });
            setMoviesDB(docs);
            
            setDatos(docs[0])
            
        }))  
    }

   
    useEffect(()=>{
        
       getMovies()
        return () => {
            setMoviesDB({}); // This worked for me
          };
        // eslint-disable-next-line
    },[])


    

    const getElements = async () =>{ //Update FireStore
        
        // await db.collection("movies").doc(movies.title).set({...moviesDB[0], comments: {comment: textArea, user: user.displayName}});
        
        await db.collection("movies").doc(movies.title).update({
            comments: firebase.firestore.FieldValue.arrayUnion({comment: textArea, user: user.displayName, email:user.email})});
            //Agregar otra propiedad de email -> user.email
    }


      const SaveToComment = (e) =>{
        e.preventDefault();
        if(textArea == ''){
            console.log(textArea, 'vacio')
            return
        }
        getElements()
       
        
        setTextArea('')
    }
    
 
    const AddFav = (e) =>{
        e.preventDefault()

        const docRef = db.collection(user.uid).doc(movies.title)
                                docRef.get().then(
                                doc => {
                                  if (doc.exists) {
                                    return
                                  }else{
                                    db.collection(user.uid).doc(movies.title).set(...moviesDB);
                                  }
                                });
    }


    return ( 
        <>
             <Helmet>
				<title>{movies.title}</title>
			</Helmet>
                <MovieCard>
                    <Container> 
                        <Cover src={IMG_PATH + movies.poster_path} alt="cover"/>
                    
                        <Hero Imagen ={`${IMG_PATH}${movies.backdrop_path}`} >
                            <Details >
                                <Title1 className="title-movies">{movies.title}<span>PG-13</span></Title1>
                            </Details> 
                        </Hero> 
                        
                        <Summary>
                            <Column1>
                                <Tag >action</Tag>
                                <Tag >fantasy</Tag>
                                <Tag >adventure</Tag>
                                {user ?
                                <span 
                                    className="add-favs"
                                    onClick={AddFav}
                                 ><FaPlus/> Add Favourite</span>
                                 :
                                 <p></p>
                                }
                                
                            </Column1> 
                            <Column2 >
                                {movies.overview}
                            </Column2> 
                        </Summary> 
                    </Container> 
                </MovieCard> 
                <div className="video-container">
                    <div className="video-title">
                        <h1 >{movies.title}</h1>
                    </div>
                    <video className="video-movies" width="640" height="360" controls>
                    <source src='/videos/MF.mp4' type="video/mp4"/>
                    </video>
                </div>
                <div className="cm-container">
                    <div className="video-title">
                        <h1 >Comentarios: </h1>
                    </div>
                    <div className="comment-section">
                        
                        
                        {'comments' in datos?
                          datos.comments.map((movieFB, index) =>{
                            return <>
                            <div key={index} className="comment-post">
                                <div className="user-imagen-post">
                                    <img src={userPhoto} alt="" />
                                </div>
                                {user && user.email === movieFB.email?
                                 <div className="comment-user">
                                 {movieFB.user}
                                 <FaTrash //Poner un IF , de si el email ingresado es igual al email acutal
                                             // Y si cumple, que tenga acceso al boton.
                                     onClick={
                                         async(e) => {
                                             e.preventDefault()
                                             await db.collection("movies").doc(movies.title).update({
                                                 comments: firebase.firestore.FieldValue.arrayRemove({comment: movieFB.comment, user: movieFB.user, email: movieFB.email})});
                                         }
                                     }
                                 />
                             </div>
                             :<div className="comment-user">
                             {movieFB.user}
                             </div>
                                }
                               
                                <div className="comment-comment">
                                    {movieFB.comment}
                                </div>
                            </div>
                            </>
                        }) 
                            
                         :
                         <div className="comment-post">
                            No hay comentarios...
                        </div>  
                    }
                        
                    </div>
                    <div className="add-comment">
                        <form className="form-add-comment">
                        <label htmlFor="comment-input">Agregar Comentario</label>
                        <textarea 
                            name="comment-input" 
                            value={textArea}
                            onChange={(e)=>setTextArea(e.target.value)}
                        ></textarea>
                        {user ? 
                        <button 
                            className="btn-cm"
                            onClick={SaveToComment}
                        >Post</button>
                        :
                        <button 
                            className="btn-cm"
                            onClick={
                                ()=>{
                                    history.push('/iniciar-sesion')
                                }
                            }
                        >Sign In to Post</button>
                        }
                        
                        </form>
                    </div>
                </div> 
        </>
     );
}


export const MovieCard = styled.div`
    font: "Lato", Arial, sans-serif;
    color: #A9A8A3;
    padding: 40px 0;
    
`
export const Container = styled.div`
    margin: 0 auto;
    width: 1080px;
    height: 600px;
    
    background: #F0F0ED;
    border-radius: 5px;
    position: relative;
`
export const Hero = styled.div`
    height: 342px;  
    margin:0;
    position: relative;
    overflow: hidden;
    z-index:1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    
    &:before {
        content:'';
        width:100%; height:100%;
        position:absolute;
        overflow: hidden;
        top:0; left:0;
        
        background:url( ${props => props.Imagen});
        background-size:cover;
        z-index:-1;
    
        transform: skewY(-2.2deg);
        transform-origin:0 0;
        
        
        backface-visibility: hidden; 
    
  }
`
  
export const Cover = styled.img`
    position: absolute;
    top: 160px;
    left: 40px;
    z-index: 2;
    width:200px;
`
export const Details = styled.div`
  padding: 190px 50px 50px 280px;
  
  position:relative;
 
`
export const Title1 = styled.div`
    
    color: white;
    font-size: 44px;
    margin-bottom: 13px;
    text-shadow: 3px 3px 5px black;
    text-transform: uppercase;
    
    


    span{
        position: absolute;
        margin-top:15px;
        margin-left: 12px;
        background: #C4AF3D;
        border-radius: 5px;
        color: #544C21;
        font-size: 14px;
        padding: 5px 7px;
        
    }
`

export const Summary = styled.div`
    bottom: 0px;
    height: 200px;
    font-size: 16px;
    line-height: 26px;
    color: #B1B0AC;
    display:flex;


`
export const Column1 = styled.div`
    margin-top:10px;
    padding-left: 50px;
    padding-top: 120px;
    width: 220px;
    float: left;
    text-align: center;
    
    
`
  
export const Column2 = styled.div`
    padding-left: 41px;
    padding-top: 30px;
    margin-left: 20px;
    width:580px;
    max-width: 700px;
    float: left;
    text-align: justify;
    text-justify: inter-character;
    flex-grow:1;
`
export const Tag = styled.span`
    background: white;
    border-radius: 10px;
    padding: 3px 8px;
    font-size: 14px;
    margin-right: 4px;
    line-height: 35px;
    cursor: pointer;

    &:hover{
        background: #ddd;
    }
`

  
 
export default Movies;