import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./login.css"

const Login = () => {

    const [logging, setLogging] = useState(false);
    const [logged, setLogged] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState(false); 
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        setLogging(true);
        setError(false);
        setInvalid(false);
        setLogged(false);

        console.log("sumbit");

        fetch("https://mma-server.onrender.com/loginAdmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Credentials: {username: userName, password: password}, data: {username: userName, password: password}})
        })
        .then(res => res.json())
        .then(data => {
            setLogging(false);
            if(data.status){
                sessionStorage.setItem('username', userName);
                sessionStorage.setItem('password', password);
                setLogged(true);
            }
            else{
                setInvalid(true);
            }
        })
        .catch(err => {
            setLogging(false);
            console.log(err);
            setError(true);
        })
    }

    if(logged || (sessionStorage.getItem('username') && sessionStorage.getItem('password'))){
        return <Navigate replace to="/"/>;
    }

    return(
        <div className="Login_container">
                <div className="messages">
                    {logging && <p className="logging">Please wait...</p>}
                    {logged && <p className="logged">Redirecting...</p>}
                    {invalid && <p className="invalid">Invalid credentials</p>}
                    {error && <p className="invalid">Internet/Server error</p>}
                </div>
            <div className="Login">
                <p className="Login_heading">Admin Login</p>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={submit}>Login</button>
            </div>
        </div>
    );
}

export default Login;