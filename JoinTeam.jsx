import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const JoinTeam = () => {
    const [teamDetails, setTeamDetails] = useState([]);
    const [teamsByLocation, setTeamsByLocation] = useState([]);
    const [playerTeams, setPlayerTeams] = useState([]);
    const navigate = useNavigate();
    const playerName = sessionStorage.getItem('fullname');
    const location = sessionStorage.getItem('location');
    const playerId = sessionStorage.getItem('playerId');

    const handleJoinNewTeam = async (teamId) => {
        try {
            const response = await fetch(`http://localhost:3000/playerteams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerId: playerId,
                    teamId: teamId,
                    position: 'Teammate'
                })
            });
            if (response.ok) {
                // Handle successful join
                console.log('Successfully joined the team!');
                sessionStorage.setItem('teamId', teamId);
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
                let match = false;
                for (let team of teamByLocation) {
                    let match = false;
                    for (let pteam of playerteams) {
                        if (pteam.teamId == team.id) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) {
                        teamDetails.push(team);
                    }
                }
                console.log("Inside UseEffect: " + JSON.stringify(teamDetails));
                // setTeamDetails(JSON.stringify(teamDetails));
                setTeamDetails(teamDetails);
            });
        });

    },[]);

    return (
        <div style={{marginTop: '-30px'}}>
            <div>
                <h2 style={{fontSize: '30px', fontWeight: 'bold'}}>SportsZone</h2>
            </div>
            
            <div className="auth-form-container">
                <table style={{width: '100%', marginBottom: '10px', borderSpacing: '10px 20px'}}>
                <thead>
                    <tr key="header">
                        <th  key="col1" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Team Name</th>
                        <th  key="col2" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Number of Members</th>
                        <th  key="col3" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Sport</th>
                        <th  key="col4" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Location</th>
                        <th  key="col5" style={{fontSize: '20px', color: "black", marginRight: '10px', fontWeight: 'bold'}}>Captain</th>
                    </tr>
                </thead>
                <tbody>
                    {teamDetails.map(team => (
                        console.log("Test Team: " + JSON.stringify(team)),
                         <tr>
                            <td>{team.teamName}</td>
                            <td>{team.numMembers}</td>
                            <td>{team.sport}</td>
                            <td>{team.location}</td>
                            <td>{team.captain}</td>
                            <td><button onClick={() => {handleJoinNewTeam(team.id)}} style={{fontSize: '10px', padding: '5px 20px'}}>Join Team</button></td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};
