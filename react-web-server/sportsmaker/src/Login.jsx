import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        handleLogin();
    }

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:3000/players/login/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const player = await response.json();
                console.log(player);
                if (password === player.password) {
                    console.log('logged in');
                    // store player's primary key and full name in sessionStorage sessionStorage.setItem('key', 'value');
                    sessionStorage.setItem('playerId', player.id); 
                    sessionStorage.setItem('fullname', player.fullname); 
                    sessionStorage.setItem('location', player.location); 
                    navigate('/landingpage');
                } else {
                    console.log('E002: Invalid email or password');
                    // show error message
                    setShowErrorMessage(true);
                }
            } else {
                setShowErrorMessage(true);
                throw new Error('E001: Invalid email or password');
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
  
                <div style={{marginTop: '-30px'}}>

                    <div>
                            <h2 style = {{fontSize: '30px', fontWeight: 'bold'}}> SportsZone</h2>
                           
                    </div>
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" onClick={handleSubmit}>Log In</button>
            </form>
            <button className="link-btn" onClick={() => navigate("/register")}>Don't have an account? Register here.</button>
            
            {/*<button onClick={() => navigate("/landingpage")}>Landing Page</button>
            {showErrorMessage && <input type="text" readOnly hidden value="Invalid email and password" />}*/}
            <p>{showErrorMessage ? `Error: Invalid email and password` : ''}</p>
            
   
        </div>
        </div>
    )
}