import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import Button from '../../components/Button'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();
    return (
    <main className="auth">
        <h2>Sign up to get the best offers!</h2>
        <form>
            <div className="input-group">
              <input required type="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="user-label">Email</label>
            </div>
            <div className="input-group">
              <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              <label className="user-label">Password</label>
            </div>
            <div className="input-group">
              <input required type="password" name="password2" onChange={(e) => setPassword2(e.target.value)}/>
              <label className="user-label">Confirm Password</label>
            </div>
            
            <Button text="Register" press={()=>navigate('/account')} 
            disabled={email.length<10 || password.length<8 || password!=password2} />

            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </form>

    </main>
  )
}

export default Register