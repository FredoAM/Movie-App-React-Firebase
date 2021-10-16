import React from 'react';
import {useAuth} from './../contexts/AuthContext';
import {Route, Redirect} from 'react-router-dom';

const RutaProtegida = ({children, ...restoDePropiedades}) => {
	const {user} = useAuth();

	if(user){
		return <Redirect to="/" /> 
	} else {
		return <Route {...restoDePropiedades}>{children}</Route>
	}
}

export default RutaProtegida