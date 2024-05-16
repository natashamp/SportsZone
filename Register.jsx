import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [dob, dateofBirth] = useState('');
    const [city, setCity] = useState('');
     const [sport, setSport] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/players', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            "fullname":name,
            "email":email,
            "password":pass,
            "dob":dob,
            "location":city,
            "sport":sport
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {

        console.error(error);
    });

    navigate("/LandingPage");
}

   // date: yyyy-mm-dd
       /*
CREATE TABLE players (
id SERIAL PRIMARY KEY,
fullname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
dob DATE NOT NULL,
location VARCHAR(50) NOT NULL,
sport VARCHAR(50) NOT NULL
);
  */

    return (
        <div style={{marginTop: '-30px'}}>
            <div>
                <h2 style={{fontSize: '30px', fontWeight: 'bold'}}>SportsZone</h2>
            </div>
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full name" />

                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                    <label style={{ alignSelf: 'flex-start' }}>Date of Birth</label>
                    <input type="date" value={dob} onChange={(e) => dateofBirth(e.target.value)} style={{ height: '30px', width: '300px' }} placeholder= "YYYY-MM-DD" />

                    <label style={{ alignSelf: 'flex-start' }}>Location</label>
                    <select value={city} onChange={(e) => setCity(e.target.value)} style={{ height: '50px', width: '300px' }}>
                        <option value="">Select City</option>
                        <option value="San Jose">San Jose</option>
                        <option value="Milpitas">Milpitas</option>
                        <option value="Santa Clara">Santa Clara</option>
                        <option value="Fremont">Fremont</option>
                        <option value="Sunnyvale">Sunnyvale</option>
                    </select>

                    <br/>
                    <label style={{ alignSelf: 'flex-start' }}>Preferred Sport</label>
                    <select value={sport} onChange={(e) => setSport(e.target.value)} style={{ height: '50px', width: '300px' }}>
                        <option value="">Select a sport</option>
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Volleyball">Volleyball</option>
                    </select>
                    <br/>
                    <button type="submit" onClick={handleSubmit}>Register</button>
                </form>
                <button className="link-btn" onClick={() => navigate("/")}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}