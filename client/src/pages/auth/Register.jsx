import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { MyContext } from '../../Context'
import './Auth.css'
import Button from '../../components/Button'

const Register = () => {
    const [username , setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [isPasswordVisible , setIsPasswordVisible ] = useState(false);
    const { state, setState } = useContext(MyContext);
    
    const navigate = useNavigate();
    if(state.user.mail || redirect) navigate('/account');

    async function registerUser(e){
      e.preventDefault();
      try{
          await axios.post('/users/register', {username, mail, password})
          .then(res => {
            localStorage.setItem('token', res.data.token);
            setState({...state, toast: {"text":"User registered successfully!", success: true} });
            setRedirect(true);
          })
      }
      catch(e){
        setState({...state, toast: {"text":e.response.data.error, success:false} });
      }
    }
    return (
    <main className="auth">
        <h2>Sign up for the best offers!</h2>
        <form>
            <div className="input-group">
              <input required type="name" name="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
              <label className="user-label">Username</label>
            </div>
            <div className="input-group">
              <input required type="email" name="email"  value={mail} onChange={(e) => setMail(e.target.value)} />
              <label className="user-label">Email</label>
            </div>
            <div className="input-group">
              <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              <label className="user-label">Password</label>
            </div>
            
            <span onClick={(e) => registerUser(e)} className="w-full">
              <Button disabled={mail.length<10 || password.length<5 || username.length<4} text='Sign up'/>
            </span>
            
            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </form>
    </main>
  )
}

export default Register