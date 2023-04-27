import React, {useState, useEffect} from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Auth.css'
import axios from 'axios';

const Login = () => {
    const [ mailOrUsername, setMailOrUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isPasswordVisible , setIsPasswordVisible ] = useState(false);
    const [ redirect , setRedirect ] = useState(false);
    const [ error , setError ] = useState('');
    useEffect(() => {
      if(error) setTimeout(()=>setError(''), 3000);
    }, [error])
    async function handleLoginSubmit(e){
        e.preventDefault();
        try{
            await axios.post('/login', {mailOrUsername, password});
            alert('User logged in successfully!');
            setRedirect(true);
        }
        catch(err){
            setError(err.message); 
        }
    }
    if(redirect) return (<Navigate to='/account' />)
    return (
    <main className='auth'>
        <h2>Log in to your account</h2>
        <form>
            <div className="input-group">
              <input required type="text" name="text"  value={mailOrUsername} onChange={(e) => setMailOrUsername(e.target.value)} />
              <label className="user-label">Email or Username</label>
            </div>

            <div className="input-group">
              <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              <label className="user-label">Password</label>
            </div>

            <button disabled={mailOrUsername.length<10 || password.length<8} 
            onClick={(e)=>handleLoginSubmit(e)} className='primaryBtn'>
                <span></span><span></span><span></span><span></span><span></span>
                <span className="text font-semibold">Log in</span>
            </button>

            <p>Don't have an account yet? <Link to={'/register'}>Sign up</Link></p>
            <h5 style={{transform: error? 'translateY(0)':'translateY(-200%)'}} className='text-red-600 transition-all duration-300'>{error}</h5>
        </form>


    </main>
  )
}

export default Login