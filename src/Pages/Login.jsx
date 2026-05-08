import React, { useState } from 'react';

function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    /*Acciones a realizar al momento de enviar el formulario*/
    const handleData = (e) => {
        e.preventDefault();

        /*console.log({
            correo,
            password
        });*/
    }

    return (
        <div className='Form' style={{ marginTop: '50px', marginBottom: '60px' }}>
            <form onSubmit={handleData}>

                <label htmlFor="mail">Nombre:</label>
                <input
                    type="text"
                    id="user_mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                ></input>

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="user_password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>

                <button type="submit" className="btn-primario">Enviar</button>
            </form>
        </div>
    );
}

export default Login;