import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import axios from 'axios';
import Button from '../../components/Button'
import { MyContext } from '../../Context'
import GoogleLogin from 'react-google-login';

const Login = () => {
    const [ mail, setMail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isPasswordVisible , setIsPasswordVisible ] = useState(false);
    const [ redirect , setRedirect ] = useState(false);
    const { state, setState } = useContext(MyContext);

    async function handleLoginSubmit(e) {
      e.preventDefault();
        const response = await axios.post('/users/login', { mail, password });
        await axios.get('/users/me', {headers: {Authorization: `Bearer ${response.data.token}`}})
        .then(res =>{
          setState({...state,user:res.data,toast: {text:`Hello, ${res.data.username}!`,success:true}});
          localStorage.setItem('token', response.data.token); 
          setRedirect(true);
        }) 
    }
    const navigate = useNavigate();
    useEffect(() => {
     if(state.user.mail || redirect) navigate('/account');
    }, [state.user, redirect])
    return (
    <main className='auth space'>
        <h2>Log in to your account</h2>
        <form>
            <div className="input-group">
              <input 
                required 
                type="text" 
                name="text" 
                autoComplete="email"  
                value={mail} 
                onChange={(e) => setMail(e.target.value)} 
              />
              <label className="user-label">Email or Username</label>
            </div>

            <div className="input-group relative">
              <input 
                required 
                type={isPasswordVisible?'text':'password'} 
                name="password" 
                autoComplete="current-password" 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                style={{letterSpacing: isPasswordVisible? 2:1}}
              />
              <label className="user-label">Password</label>
              <span className="absolute right-4 top-1/2 -translate-y-[50%]" onClick={()=> setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#999" className="w-6 h-6">  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>}
              </span>
            </div>

            <GoogleLogin 
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={res => console.log(res)}
              onFailure={res => console.log(res)}
              cookiePolicy={'single_host_origin'}
            />

            <span onClick={(e)=>handleLoginSubmit(e)} className='w-full'>
              <Button disabled={mail.length<4 || password.length<5} text='Log in'/>
            </span>
            
            <p>Don't have an account yet? <Link to={'/register'}>Sign up</Link></p>
        </form>
    </main>
  )
}

export default Login