import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from './../firebase/firebaseConfig';
import Alerta from './../elementos/Alerta';
import {Helmet} from 'react-helmet';

const RegistroUsuario = () => {
    const history = useHistory();
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false) //useState de Alerta
    const [alerta, cambiarAlerta] = useState({})

    const handleChange = (e) =>{
        switch(e.target.name){
            case 'email':
                setCorreo(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            case 'password2':
                setPassword2(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit= async(e) =>{
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        //Se le pone return a todas para evitar correr todo el codigo, si algo esta mal el resto tambien lo esta no?
        //Verificar si es un correo valido
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)){
            cambiarEstadoAlerta(true)
            cambiarAlerta({
                tipo:'error',
                mensaje:'Ingrese un correo electronico valido'
            })
            return;
        }
        //Verificar si no dejo vacio algun campo 

        if(correo === '' || password === '' || password2 === ''){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por favor rellena todos los datos'
			});
			return;
        }
        //Verificar si las contraseñas son iguales
        if(password !== password2){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Las contraseñas no son iguales'
			});
			return;
		}
        try{
            await auth.createUserWithEmailAndPassword(correo,password)
            history.push('/');            
        } catch(error){
            cambiarEstadoAlerta(true);
            let mensaje;
            
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje});     }
    }
    return ( 
        <>  
            <Helmet>
				<title>Registrar Cuenta</title>
			</Helmet>
            <div className="container-login">
                <div className="form-container">
                    <h1 className="title-form">Registro</h1>
                    <form className="form"  onSubmit={handleSubmit}>
                        <input 
                            className="input-form" 
                            type="text" 
                            placeholder="Email Address" required
                            name="email"
                            value={correo}
                            onChange={handleChange}
                        />
                        <input 
                            className="input-form" 
                            type="password" 
                            placeholder="Password" required
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <input 
                            className="input-form" 
                            type="password" 
                            placeholder="Repeat Password" required
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                        />
                        <div class="signup-link">
                            ¿Ya tienes cuenta? <a href="/iniciar-sesion">Inicia Sesión</a>
                        </div>
                        <button className="btn-form">Crear Cuenta</button>
                    </form>
                </div>
                <Alerta 
                    tipo={alerta.tipo}
                    mensaje={alerta.mensaje}
                    estadoAlerta={estadoAlerta}
                    cambiarEstadoAlerta={cambiarEstadoAlerta}
                />
                
            </div>
        </>
     );
}
 
 
export default RegistroUsuario;