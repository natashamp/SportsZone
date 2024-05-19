import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [numMembers, setNumMembers] = useState('');
    const [location, setLocation] = useState('');
    const [sport, setSport] = useState('');
     const [captain, setCaptain] = useState('');
  const navigate = useNavigate();

         const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/teams', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            "teamName":teamName,
            "numMembers":numMembers,
            "location":location,
            "sport":sport,
            "captain":captain
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

    return (
        <div style={{marginTop: '-30px'}}>
                    <div>
                            <h2 style = {{fontSize: '30px', fontWeight: 'bold'}}> SportsZone</h2>
                           
                    </div>
            
            <div className="auth-form-container">
                    <h3> Create New Team</h3>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ alignSelf: 'flex-start' }}>Team Name</label>
                            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} style={{ height: '30px', width: '300px' }} />
                            <label style={{ alignSelf: 'flex-start' }}># of Team Members</label>
                            <input type="integer" value={numMembers} onChange={(e) => setNumMembers(e.target.value)} style={{ height: '30px', width: '300px' }} />
                    <label style={{ alignSelf: 'flex-start' }}>Location</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ height: '50px', width: '300px' }}>
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
                            <label style={{ alignSelf: 'flex-start'}}>Team Captain</label>
                            <input type="text" value={captain} onChange={(e) => setCaptain(e.target.value)} style={{ height: '30px', width: '300px' }} />
                    </div>
                    <div>
                          <button type="submit" onClick={handleSubmit}>Register Team</button>
                    </div>
            </div>
    </div>
    );
};
