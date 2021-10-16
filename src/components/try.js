import React, {useState, useEffect} from 'react';
import {useAuth} from './../contexts/AuthContext';
import {db} from './../firebase/firebaseConfig'



const TRY = () => {


    const {usuario, user} = useAuth();
    const [datos, setDatos] = useState([]);


    const SetFire = (e) =>{
        e.preventDefault()
        if(user){
            const docRef = db.collection('prueba').doc(user.uid)
            docRef.get().then(
            doc => {
            if (doc.exists) {
                return
            }else{
                db.collection("prueba").doc(user.uid).set({
                    displayName:'Introduce un Nombre',
                    url: "",
                    github:'',
                    twitter:'',
                    instagram:'',
                    facebook:''
                  });
            }
        });
    }
}

const getMovies = async () => {
        
    db.collection("prueba").doc(user.uid)
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
    });
}

const GetFire = (e) =>{
    e.preventDefault()
    getMovies()

}

    return (  
        <>
        <button
            onClick={SetFire}
        >Set Fire</button>
           <button
            onClick={GetFire}
        >Get Fire</button>

        <p>{console.log()}</p>

        </>
     );
}
 
export default TRY