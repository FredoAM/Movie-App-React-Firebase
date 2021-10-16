import React, {useState, useEffect} from 'react';
import userPhoto from './../imagenes/userNotSet.jpeg'
import {useAuth} from './../contexts/AuthContext';
import { FaFacebookF,FaTwitter,FaInstagram, FaGithubAlt, FaGlobe,FaPlus, FaTimes , FaTrash} from "react-icons/fa"
import listaLupa from './../imagenes/lupa.png'
import {Helmet} from 'react-helmet';
import {db} from './../firebase/firebaseConfig'


const Perfil = ({children, ...rest}) => {

    const {usuario, user} = useAuth();
    

    const initialStateValues = {
        displayName:'',
        url: "",
        github:'',
        twitter:'',
        instagram:'',
        facebook:''
      };

    
    const [state, setState] = useState(true)
    const [favs, setFavs] = useState([]);
    const [datos, setDatos] = useState([]);
    const [values, setValues] = useState(initialStateValues);
    
    const getFavourites = async () => {
        
        const dataID = db.collection(user.uid)
        dataID.onSnapshot(((querySnapshot) => {
            const fabs = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                
                fabs.push({...doc.data()});
               console.log(fabs)
            });
            setFavs(fabs);
            
        }))  
    }
    
    const updateElements = async () =>{ //Update FireStore
        
        await db.collection("perfiles").doc(user.email).set( {
            displayName: values.displayName,
            url: values.url,
            github: values.github,
            twitter: values.twitter,
            instagram: values.instagram,
            facebook: values.facebook
          })
        
        
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

    const handleEdit = (e) => {
        e.preventDefault()
        setState(!state)
        
        console.log(datos)
       
          
};
const handleSave = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    usuario.updateProfile({
        displayName: values.displayName
      })
      updateElements()
      getMovies()
      console.log(datos)
      setState(!state)
};
   
      const handleClose = ()=>{
          console.log(state)
          setState(!state)
      }  
    

    const getMovies = async () => {
        const docs = [];
        db.collection("perfiles").doc(user.email)
        .onSnapshot((doc) => {
            
            docs.push({...doc.data()});
            setDatos(docs)
        }); 
    }



    useEffect(()=>{
      
    getMovies()
    getFavourites()
    
    },[])
        
    
    return ( 
        <>
         <Helmet>
          <title>Perfil</title>
        </Helmet>
        <div className="container-perfil">
            <div 
                id="popup-form"
                className={state ? 'active' : null}    
            >
                <img src={userPhoto} alt="" />
                <FaTimes
                    onClick={handleClose}
                />
                <form action="" className="edit-form">
                            
                            <input 
                                id='user-data-input'
                                type="text"
                                value={values.displayName}
                                placeholder="Introduce tu Nombre"
                                name='displayName'
                                onChange={handleInputChange}
                            />
                            <input 
                                id="media-input" 
                                type="text"
                                value={values.url}
                                name='url'
                                placeholder="www.facebook.com"
                                onChange={handleInputChange}
                            />
                            <input 
                                id="media-input" 
                                type="text"
                                value={values.github}
                                name='github'
                                placeholder="@github"
                                onChange={handleInputChange}
                            />
                            <input 
                                id="media-input" 
                                type="text"
                                value={values.twitter}
                                name='twitter'
                                placeholder="@twitter"
                                onChange={handleInputChange}
                            />
                            <input 
                                id="media-input" 
                                type="text"
                                value={values.instagram}
                                placeholder="@instagram"
                                name='instagram'
                                onChange={handleInputChange}
                            />
                            <input 
                                id="media-input" 
                                type="text"
                                value={values.facebook}
                                name='facebook'
                                placeholder="@facebook"
                                onChange={handleInputChange}
                            />
                    <button
                        onClick={handleSave}
                    >Click me :P</button>
                </form>
            </div>
            <div className="container-boxes">
                <div className="user-info">
                    <div className="user-photo">
                        <img src={userPhoto} alt="" />
                        <FaPlus/>
                    </div>
                    <div className="user-form">
                        <form className="user-data">
                            {datos.map((dato) =>{
                                return dato.displayName === '' ?
                                <span id='user-data-span' key={dato.email}>Introduce tu Nombre</span>
                                :
                                <span 
                                    id='user-data-span'
                                    key={dato.iud}
                                    >{dato.displayName}</span>
                            })}
                            <button 
                                id='btn-edit'
                                onClick={handleEdit}
                            >Editar</button>
                        </form>
                    </div>
                </div>
                <div className="user-media">
                    <div className="user-media-container">
                        <span className="media-info web"><FaGlobe/>Website</span>
                        {datos.map((dato) =>{
                                return dato.url === '' ?
                                <span id='user-data-span' key={dato.email}>@website</span>
                                :
                                <span 
                                    id='user-data-span'
                                    key={dato.iud}
                                    >{dato.url}</span>
                            })}
                    </div>
                    <div className="user-media-container">
                        <span className="media-info git"><FaGithubAlt/>Github</span>
                        {datos.map((dato) =>{
                                return dato.github === '' ?
                                <span id='user-data-span' key={dato.email}>@github</span>
                                :
                                <span 
                                    id='user-data-span'
                                    key={dato.iud}
                                    >{dato.github}</span>
                            })}
                    </div>
                    <div className="user-media-container">
                        <span className="media-info twitter"><FaTwitter/>Twitter</span>
                        {datos.map((dato) =>{
                                return dato.twitter === '' ?
                                <span id='user-data-span' key={dato.email}>@twitter</span>
                                :
                                <span 
                                    id='user-data-span'
                                    key={dato.iud}
                                    >{dato.twitter}</span>
                            })}
                    </div>
                    <div className="user-media-container">
                        <span className="media-info instagram"><FaInstagram/>Instagram</span>
                        {datos.map((dato) =>{
                                return dato.instagram === '' ?
                                <span id='user-data-span' key={dato.email}>@instagram</span>
                                :
                                <span 
                                    id='user-data-span'
                                    key={dato.iud}
                                    >{dato.instagram}</span>
                            })}
                    </div>
                    <div className="user-media-container">
                        <span className="media-info face"><FaFacebookF/>Facebook</span>
                        {datos.map((dato) =>{
                                return dato.facebook === '' ?
                                <span id='user-data-span' key={dato.email}>@facebook</span>
                                :
                                <span 
                                    id='user-data-span'
                                    key={dato.iud}
                                    >{dato.facebook}</span>
                            })}
                    </div>
                    
                </div>
                <div className="user-profile-page">
                    <div className="profile-favs">
                        <span className="favs-section-title">
                            <h2>Favoritos</h2>
                        </span>
                        {favs ?
                            favs.map((lista, index) =>{
                                return <><div key={index} className="lista-favoritos">
                                    <div className="titulo-favs">
                                    {lista.title} 
                                    <FaTrash
                                        onClick={
                                            async(e) => {
                                                e.preventDefault()
                                                await db.collection(user.uid).doc(lista.title).delete();
                                            }
                                        }
                                    />   
                                    </div> 
                                    <div className="overview-favs">
                                    {lista.overview} 
                                    </div> 
                                </div>
                                </>
                            })
                            :
                            <div className="lista-vacia">
                            <img src={listaLupa} alt="" />
                            <h2>Lista Vacia</h2>
                            <span>Aun no tienes nada agregado</span>
                            </div>
                    }
                        
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Perfil;
