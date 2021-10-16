import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyles } from './global-styles';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {MoviesProvider} from './contexts/MoviesContext';
import {Movies, Search, NavBar, InicioSesion, RegistroUsuario, Perfil, RutaPrivada, RutaProtegida, Footer,Series ,Peliculas} from './components';
import {AuthProvider} from './contexts/AuthContext'
import TRY from './components/try'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles/>
      <AuthProvider>
        <MoviesProvider>
          <NavBar/>
          <Switch>
            <TRY path="/test"/>
            <RutaProtegida path="/iniciar-sesion" component={InicioSesion}/>
            <RutaProtegida path="/crear-cuenta" component={RegistroUsuario}/>
            <Route exact path="/" >
              <App />
            </Route>
            <Route path="/Movies/:id">
              <Movies/>
            </Route>
            <Route path="/Search">
              <Search/>
            </Route>
            <Route path="/Series">
              <Series/>
            </Route>
            <Route path="/Peliculas">
              <Peliculas/>
            </Route>
            <RutaPrivada>
              <Perfil path="/Perfil"/>
            </RutaPrivada>
          </Switch>
          <Footer/>
        </MoviesProvider>
      </AuthProvider>
     
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


