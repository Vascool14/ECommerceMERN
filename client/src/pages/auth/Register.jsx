import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import Button from '../../components/Button'

const Register = () => {
    const [username , setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible , setIsPasswordVisible ] = useState(false);
    const navigate = useNavigate();

    async function registerUser(e){
      e.preventDefault();
      try{
          await axios.post('/register', {username, email, password});
          alert('User created successfully!');
      }
      catch(e){
          alert(' Error registering. Email already in use.');
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
              <input required type="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="user-label">Email</label>
            </div>
            <div className="input-group">
              <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              <label className="user-label">Password</label>
            </div>
            
            <Button text="Register"  disabled={email.length<10 || password.length<8 || username.length<3} />

            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </form>

    </main>
  )
}

export default Register