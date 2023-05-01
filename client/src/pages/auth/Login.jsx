import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import axios from 'axios';
import Button from '../../components/Button'
import { MyContext } from '../../Context'

const Login = () => {
    const [ mail, setMail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isPasswordVisible , setIsPasswordVisible ] = useState(false);
    const [ redirect , setRedirect ] = useState(false);
    const { state, setState } = useContext(MyContext);

    async function handleLoginSubmit(e) {
      e.preventDefault();
      try {
        const response = await axios.post('/users/login', { mail, password });
        await axios.get('/users/me', {headers: {Authorization: `Bearer ${response.data.token}`}})
        .then(res =>{
          setState({...state,user:res.data,toast: {text:`Hello, ${res.data.username}!`,success:true}});
          localStorage.setItem('token', response.data.token); 
          setRedirect(true);
        }) 
      }catch(err){ 
        setState({...state, toast: { text:err.response.data.error, success: false }});
        console.log(err);
      }
    }
    const navigate = useNavigate();
    if(state.user.mail || redirect) navigate('/account');
    return (
    <main className='auth'>
        <h2>Log in to your account</h2>
        <form>
            <div className="input-group">
              <input required type="text" name="text" autoComplete="email"  value={mail} onChange={(e) => setMail(e.target.value)} />
              <label className="user-label">Email or Username</label>
            </div>

            <div className="input-group">
              <input required type="password" name="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              <label className="user-label">Password</label>
            </div>

            <span onClick={(e)=>handleLoginSubmit(e)} className='w-full'>
              <Button disabled={mail.length<4 || password.length<5} text='Log in'/>
            </span>
            
            <p>Don't have an account yet? <Link to={'/register'}>Sign up</Link></p>
        </form>


    </main>
  )
}

export default Login