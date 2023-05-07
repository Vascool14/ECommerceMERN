import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../Context';
import axios from 'axios';
import './Pages.css'
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './auth/Auth.css';

const Home = () => {
  const { state, setState } = useContext(MyContext);

  const [mail, setMail] = useState('');
  const [username, setUsername ] = useState('')
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, mail, password, avatar, wishlist, cart};
    axios.post('users/register', user)
      .then((res) => {
        console.log(res.data);
        setState({ ...state, user: res.data });
      })
      .catch((err) => console.log(err));
  }
  
  // const link = "https://drive.google.com/file/d/1Ea_QellRdiwTRKeIuSnW76pQC6c7sncj/view?usp=share_link"
  // console.log(`https://drive.google.com/uc?id=${link.match(/\/d\/(.+?)\//)[1]}`); 
  // https://drive.google.com/uc?id=1fgMY4sRrk7NYSZjXbS54dkOSFA4ILswx
  // https://drive.google.com/uc?id=1txNvKZtPSqEOKSDJq4cSBvQkJC9qHk68
  // https://drive.google.com/uc?id=13ZsK6tvztabamndE0AOyGaE8zZImL_lF
  // https://drive.google.com/uc?id=1nZ89DO7aaBQLIK__V-Ky1GNIQndBVqOa
  // https://drive.google.com/uc?id=1Ea_QellRdiwTRKeIuSnW76pQC6c7sncj

  return (
    <main>
      <h1>Home</h1>
      <Link to="/products" className='p-4 rounded-xl bg-[var(--text)] text-[var(--bg)]'>Products</Link>
      <div className='p-10 overflow-hidden bg-[var(--bg)] border-t-2'>
      <Link to="/admin">Admin Dashboard</Link>
        <h4>ntium, sit sunt placeat ea natus. t amet consectetur adipisicing elit. Voluptatem repellat perspiciatis quo voluptas fugit numquam neque, officia natus quidem eligendi porro, assumenda corrupti quas? Doloremque sint earum commodi suscipit sunt!</h4>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aspernatur praesentium ut tenetur esse placeat repudiandae nisi autem alias eaque.</h3>
      </div>
      <form className='flex flex-col gap-2 text-[var(--bg)]'>
            <div className="input-group">
              <input required type="email" name="email"  value={mail} onChange={(e) => setMail(e.target.value)} />
              <label className="user-label">Email</label>
            </div>

            <div className="input-group">
              <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              <label className="user-label">Password</label>
            </div>
            
            <div className="input-group">
              <input required type="name" name="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label className="user-label">Username</label>
            </div>

            <div className="input-group">
              <input required type="text" name="Profile picture" onChange={(e) => setAvatar(e.target.value)}/>
              <label className="user-label">Picture url</label>
            </div>

            <div className="input-group">
              <input required type="text" name="wishlist" onChange={(e) => setWishlist([...wishlist, e.target.value])}/>
              <label className="user-label">Wishlist</label>
            </div>

            <div className="input-group">
              <input required type="text" name="cart" onChange={(e) => setCart(e.target.value)}/>
              <label className="user-label">Cart</label>
            </div>

            <span className="w-full" onClick={(e) => handleSubmit(e)}>
              <Button text="Create User" disabled={mail.length<10 || password.length<8}/>
            </span>
      </form>
    </main>
  )
}

export default Home