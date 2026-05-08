import React from 'react';

function Login() {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    /*Acciones a realizar al momento de enviar el formulario*/
    const handleData = (e) => {
        e.preventDefault();
        
        

        /*console.log({
            nombre,
            correo,
            password
        });*/
    }

    return (
        <form onSubmit={handleData}>

            <label Name="mail">Nombre:</label>
            <input
                type="text"
                id="user_mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
            ></input>

            <label password="password">Contraseña:</label>
            <input
                type="password"
                id="user_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            ></input>

            <button type="submit">Enviar</button>
        </form>
    );
}

export default Login;