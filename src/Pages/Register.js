import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';

export const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const [password, setPassword] = useState();
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const [uniqueUsername, setUniqueUsername] = useState(true);
    // ADD ERROR HANDLING TO .THEN(NAVIGATE) OTHERWISE IT WILL ALWAYS GO TO LOGIN
    const handleRegisterStatuses = (res) => {
        console.log(res);
        if (res.status === 409) {
            setUniqueUsername(false);
        } if (res.status === 201) {
            setUniqueUsername(true);
            navigate('/Login');
        };
    };

    const registerAccount = async (e) => {
        e.preventDefault();
        console.log('YOU HIT THE REGISTER BUTTON!!');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ uname: username, pw: password })
        };
        console.log(requestOptions.body);
        await fetch('/register', requestOptions).then((res) => handleRegisterStatuses(res));
    }

    // method="post" action="register"
    return (
        <div className='LoginMasterContainer'>
        <div className='LoginContainer'>
            <form>
                <div className='LoginWrapper'>
                    <div className='LoginLogo'>
                        <i className="fa-solid fa-person-running"></i>
                    </div>
                    <h1 className='LoginTitle'>Fitr</h1>
                    <div className='LoginAccess'>
                        <span className='LoginPrompt'>Create new account</span>
                        <span className='LoginUserNameText'>Username</span>
                        <input className='LoginInput' type="text" name="uname" onChange={handleUsername} />
                        <span className='LoginPasswordText'>Password</span>
                        <input className='LoginInput' type="password" name="pw" onChange={handlePassword} />
                        {!uniqueUsername? <span className='LoginFailureMessage'>Username taken, please try another.</span> : ''}
                        <button className='button-1' type="submit" onClick={(e) => registerAccount(e)}>Create</button>
                        <span className='LoginRegisterPrompt'>Already have an account? <Link to="/Login" className='LoginRegisterLink'><strong>Login</strong></Link></span>
                    </div>
                </div>
            </form>
        </div>
        <Footer />
        </div>
    )
}