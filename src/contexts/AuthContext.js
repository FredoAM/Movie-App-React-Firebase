import React, { useState, useContext, useEffect } from 'react';
import {auth} from './../firebase/firebaseConfig';
import {db} from './../firebase/firebaseConfig'
// Creamos el contexto;
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => {
	return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
	const [usuario, cambiarUsuario] = useState();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
	
	// Creamos un state para saber cuando termina de 
	// cargar la comprobacion de onAuthStateChanged
	// const [cargando, cambiarCargando] = useState(true);

	// Efecto para ejecutar la comprobacion una sola vez.
	useEffect(() => {
		// Comprobamos si hay un usuario.
		const cancelarSuscripcion = auth.onAuthStateChanged((usuario) => {
			cambiarUsuario(usuario);
			// cambiarCargando(false);
		});

		return cancelarSuscripcion;
	}, []);

    useEffect(() => {
        const listener = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            localStorage.setItem('authUser', JSON.stringify(authUser));
            setUser(authUser);

			
          } else {
            localStorage.removeItem('authUser');
            setUser(null);
          }
        });
    
        return () => listener();
      }, []);
    

	  useEffect(()=>{
		  if(user){
			const docRef = db.collection('perfiles').doc(user.email)
			docRef.get().then(
			doc => {
			if (doc.exists) {
				return
			}else{
				db.collection("perfiles").doc(user.email).set({
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
	  },[])

	return (
		<AuthContext.Provider value={{usuario: usuario, user:user}}>
			{/* Solamente retornamos los elementos hijos cuando no este cargando. 
			De esta forma nos aseguramos de no cargar el resto de la app hasta que el usuario haya sido establecido.
			
			Si no hacemos esto al refrescar la pagina el componente children intenta cargar inmediatamente, 
			antes de haber comprobado que existe un usuario. */}
			{/* {!cargando && children} */}
            {children}
		</AuthContext.Provider>
	);
}
 
export {AuthProvider, AuthContext, useAuth};