import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from './../firebase/firebaseConfig';
import Alerta from './../elementos/Alerta';
import {Helmet} from 'react-helmet';

const InicioSesion = () => {

    const history = useHistory();
	const [correo, establecerCorreo] = useState('');
	const [password, establecerPassword] = useState('');
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
		if(e.target.name === 'email'){
			establecerCorreo(e.target.value);
		} else if (e.target.name === 'password'){
			establecerPassword(e.target.value);
		}
	}

    const handleSubmit = async (e) => {
		e.preventDefault();
		cambiarEstadoAlerta(false);
		cambiarAlerta({});

		// Comprobamos del lado del cliente que el correo sea valido.
		const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
		if( !expresionRegular.test(correo) ){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por ingresa un correo electrónico valido'
			});
			return;
		}

		if(correo === '' || password === ''){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por favor rellena todos los datos'
			});
			return;
		}

		try {
			await auth.signInWithEmailAndPassword(correo, password);
			history.push('/');
		} catch(error) {
			console.log(error)
			cambiarEstadoAlerta(true);
			let mensaje;
			switch(error.code){
				case 'auth/wrong-password':
					mensaje = 'La contraseña no es correcta.'
					break;
				case 'auth/user-not-found':
					mensaje = 'No se encontro ninguna cuenta con este correo electrónico.'
					break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				break;
			}

			cambiarAlerta({tipo: 'error', mensaje: mensaje});
		}
	}

    return ( 
        <>  
			<Helmet>
				<title>Iniciar Sesión</title>
			</Helmet>
            <div className="container-login">
                <div className="form-container">
                    <h1 className="title-form">Iniciar Sesion</h1>
                    <form className="form" onSubmit={handleSubmit}>
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
                        <div class="signup-link">
                            Not a member? <a href="/crear-cuenta">Signup now</a>
                        </div>
                        <button className="btn-form">Iniciar Sesión</button>
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
 
export default InicioSesion;