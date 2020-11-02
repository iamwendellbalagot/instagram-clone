import React, {useState} from 'react';
import './Signup.css';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const handleSubmit = event =>{ 
        event.preventDefault();
        console.log(email, fullname, username, password, confPassword)
    }

    return (
        <div className='signup'>
            <div className='signup__container'>
                <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='LOGO' />
                <h3>Sign up to see photos and videos from your friends.</h3>
                <form className='signup__form' onSubmit={handleSubmit} >
                    <input 
                        type='email'  
                        placeholder='Type your email here'
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} />
                    <input 
                        type='text'  
                        placeholder='Fullname'
                        value={fullname} 
                        onChange={(e)=>setFullname(e.target.value)} />
                    <input 
                        type='text'  
                        placeholder='Username'
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)} />
                    <input 
                        type='password' 
                        placeholder='Password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                    <input 
                        type='password' 
                        placeholder='Confirm Password'
                        value={confPassword} 
                        onChange={(e) => setConfPassword(e.target.value)} />
                    
                        
                    <button type='submit'>Sign up</button>
                </form>
            </div>
            <div className='signup__login'>
                <p>Already have an account?</p>
                <span>Log in</span>
            </div>            
        </div>
    )
}

export default Signup
