import { blueGrey } from "@mui/material/colors";
import React, { useState, useEffect } from "react";

import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const [teamDetails, setTeamDetails] = useState([]);
    const [teamsByLocation, setTeamsByLocation] = useState([]);
    const [playerTeams, setPlayerTeams] = useState([]);
    const navigate = useNavigate();
    const playerId = sessionStorage.getItem('playerId');
    const playerName = sessionStorage.getItem('fullname');
    const location = sessionStorage.getItem('location');


    const handleChatRooms = async (teamId) => {
        sessionStorage.setItem('teamId', teamId);
        navigate("/MessageBoard");
    }

    const handleRemove = async (teamId) => {
        try {
            const response = await fetch(`http://localhost:3000/playerteams/playerId/${playerId}/teamId/${teamId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Successfully deleted the team!');
                
                for (let i = 0; i < teamDetails.length; i++) {
                    if (teamDetails[i].id === teamId) {
                        teamDetails.splice(i, 1);
                        break;
                    }
                }
                setTeamDetails(teamDetails);
                navigate("/LandingPage");
            } else {
                console.error('Error joining the team:', response.status);
            }
        } catch (error) {
            console.error('Error joining the team:', error);
        }
    }


    useEffect(() => {
        
        const getTeams = async () => {
            try {
                console.log("Inside getTeams: " + location);
                const response = await fetch(`http://localhost:3000/teams/location/${location}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let teamByLocation = [];
                if (response.ok) {
                    teamByLocation = await response.json();                
                    
                } else {
                    console.error('Error fetching team details:', response.status);
                }
                console.log("Inside getTeams after fetch: " + JSON.stringify(teamByLocation));
                return teamByLocation;
            } catch (error) {
                console.error('Error fetching team details:', error);
            }
        }

        const getPlayerTeams = async () => {
            try {
                const response = await fetch(`http://localhost:3000/playerteams/player/${playerId}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                let playerteams = [];
                if (response.ok) {
                    playerteams = await response.json();
                } else {
                    console.error('Error fetching player teams:', response.status);
                }
                console.log("Inside getPlayerTeams after fetch: " + JSON.stringify(playerteams));
                return playerteams;
            } catch (error) {
                console.error('Error fetching player teams:', error);
            }
        }

        getPlayerTeams().then((playerteams) => {

            getTeams().then((teamByLocation) => {
                let teamDetails = [];
                for(let pteam of playerteams) { // {p:2, t:1}, {p:2, t:2}
                    console.log("pteam: " + JSON.stringify(pteam));
                    for (let team of teamByLocation) { // {id:1, name:team, location:SJ}, {id:2, name:warriors, location:SJ}
                        console.log("candidate team: " + JSON.stringify(team));
                        if (pteam.teamId == team.id) {
                            console.log("matched team: " + JSON.stringify(team));
                            team.position = pteam.position;
                            teamDetails.push(team);
                            break;
                        }
                    }
                }
                console.log("Inside UseEffect: " + JSON.stringify(teamDetails));
                setTeamDetails(teamDetails);
            });
        });

    },[]);


    return (
        
        <div style={{marginTop: '-50px', backgroundColor: blueGrey}}>
            <div>
                <CiUser size={60} />
                <h2 style = {{fontSize: '30px'}}> {playerName}</h2>
            </div>

        <div className="auth-form-container">
            <table style={{width: '100%', marginBottom: '10px', borderSpacing: '10px 20px'}}>
                <thead>
                    <tr key="header">
                        <th  key="col1" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Team Name</th>
                        <th  key="col2" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Team Position</th>
                        <th  key="col3" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Sport</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {console.log("In tbody teamDetails: " + JSON.stringify(teamDetails))}
                    {teamDetails.map(team => (
                        <tr>
                            <td> {team.teamName} </td>
                            <td> {team.position} </td>
                            <td> {team.sport} </td>
                            <td><button onClick={() => {handleChatRooms(team.id)}} style={{fontSize: '12px', color: "white", marginRight: '10px', padding: '5px 10px'}}>Chat Room</button></td>
                            <td><button onClick={() => {handleRemove(team.id)}} style={{fontSize: '12px', color: "white", marginRight: '10px', padding: '5px 10px'}}>Leave Team</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            
            <div style={{textAlign: 'left'}}>
                <br/>
                <button onClick = {() =>{ navigate("/JoinTeam");}} style={{fontSize: '12px', color: "white", marginRight: '10px', padding: '5px 10px'}}> Join New Team</button>
                <button onClick = {() =>{ navigate("/CreateTeam");}} style={{fontSize: '12px', color: "white", padding: '5px 10px'}}> Create New Team</button>
            </div>
        </div>
     
        
    );
};
