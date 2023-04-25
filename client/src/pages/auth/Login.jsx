import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Auth.css'
import Button from '../../components/Button'

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isPasswordVisible , setIsPasswordVisible ] = useState(false);
    const [ redirect , setRedirect ] = useState(false);
    async function handleLoginSubmit(e){
        e.preventDefault();
        try{
            const {data} = await axios.post('/login', {email, password});
            setUser(data); 
            alert('Login successful!');
            setRedirect(true);
        }
        catch(e){
            alert('Error logging in. Please try again later.'); 
        }
    }
    if(redirect) return (<Navigate to='/account' />);
    return (
    <main className='auth'>
        <h2>Log in to your account</h2>
        <form>
            <div className="input-group">
              <input required type="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="user-label">Email</label>
            </div>

            <div className="input-group">
              <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              <label className="user-label">Password</label>
            </div>

            <Button text="Log in" disabled={email.length<10 || password.length<8} press={(e)=>handleLoginSubmit(e)}/>
            <p>Don't have an account yet? <Link to={'/register'}>Sign up</Link></p>
        </form>


    </main>
  )
}

export default Login