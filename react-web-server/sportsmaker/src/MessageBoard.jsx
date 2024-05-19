import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const MessageBoard = () => {
    const [teamDetails, setTeamDetails] = useState([]);
    const [teamsByLocation, setTeamsByLocation] = useState([]);
    const [playerTeams, setPlayerTeams] = useState([]);
    const navigate = useNavigate();
    const playerName = sessionStorage.getItem('fullname');
    const teamId = sessionStorage.getItem('teamId');
    const playerId = sessionStorage.getItem('playerId');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState(""); 


    const createMessage = async (teamId) => {

    }

    useEffect(() => {
        

        const getMessages = async () => {
            try {
                console.log("Inside getMessages: " + teamId);
                const response = await fetch(`http://localhost:3000/messages/team/${teamId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let teamMessages = [];
                if (response.ok) {
                    teamMessages = await response.json();                
                    
                } else {
                    console.error('Error fetching team messages:', response.status);
                }
                console.log("Inside getMessages after fetch: " + JSON.stringify(teamMessages));
                return teamMessages;
            } catch (error) {
                console.error('Error fetching team messages:', error);
            }
        }

        getMessages().then((teamMessages) => {
            console.log("Inside use effects: " + JSON.stringify(teamMessages));
            setMessages(teamMessages);
        });
        
    
    }, []);

    // Handler for input text change
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // Handler for sending the message
    const handleSendClick = async () => {
       
        // Here you could also handle sending the message to a backend or displaying it
        // on the chat window immediately
        //use fetch to send the message to the backend
    

        try {
            const response = await fetch(`http://localhost:3000/messages/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teamId: teamId,
                    playerId: playerId,
                    text: inputText
                })
                
            });
            if (response.ok) {
                console.log('Successfully created messages!');
                
                setInputText("");  // Clear input after sending
                window.location.reload();
                //navigate("/MessageBoard");
            } else {
                console.error('Error joining the team:', response.status);
            }
        } catch (error) {
            console.error('Error joining the team:', error);
        }
        
    };





    return (

        <div className="chat-page">
            <div className="chat-container">
                <h2 style={{fontSize: '30px', fontWeight: 'bold'}}>Chat Room</h2>
                {messages.map(message => (
                    console.log("Inside h2 messages: " + message.playerId.toString()),
                    console.log("Inside h2 playerId: " + playerId), 
                    console.log("Inside h2 : " + message.playerId.toString() == playerId),
                    console.log("Inside h2 playerIdt: " + typeof(playerId)), 
                    console.log("Inside h2 messagest: " + typeof(message.playerId)),
                    <div key={message.id} className={`message ${message.playerId.toString() === playerId ? "own" : ""}`}>
                        <div className="sender">Player Id: {message.playerId}</div>
                        <div className="text">{message.text}</div>
                        <div className="timestamp">{message.createdAt}</div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button onClick={handleSendClick} className="send-button">Send</button>
            </div>
            <button onClick = {() =>{ navigate("/LandingPage");}} style={{fontSize: '12px', color: "white", padding: '10px 15px'}} className="home">Home</button>
        </div>
    );
};

