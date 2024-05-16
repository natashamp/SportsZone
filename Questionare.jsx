import React, { useState } from "react";

export const Questionare = () => {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [profilePicture, setProfilePicture] = useState('profile_picture_url');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
     const [answer4, setAnswer4] = useState('');

    return (
        
        <div className="auth-form-container">
            <h2> Questionnare</h2>
            <h3>Welcome, {firstName} {lastName}</h3>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ alignSelf: 'flex-start' }}>Full Name</label>
                <input type="text" value={answer1} onChange={(e) => setAnswer1(e.target.value)} style={{ height: '30px', width: '300px' }} />
                <label style={{ alignSelf: 'flex-start' }}>Date of Birth</label>
                <input type="text" value={answer2} onChange={(e) => setAnswer2(e.target.value)} style={{ height: '30px', width: '300px' }} />
                <label style={{ alignSelf: 'flex-start' }}>Location</label>
                <input type="text" value={answer3} onChange={(e) => setAnswer3(e.target.value)} style={{ height: '30px', width: '300px' }} />
                <label style={{ alignSelf: 'flex-start' }}>Prefered Sport</label>
                <input type="text" value={answer4} onChange={(e) => setAnswer4(e.target.value)} style={{ height: '30px', width: '300px' }} />
            </div>
            <div>
                <button style={{ color: 'white' }}>Submit</button>
            </div>
        </div>
    );
};
