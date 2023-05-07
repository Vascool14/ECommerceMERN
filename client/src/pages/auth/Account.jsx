import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { MyContext } from '../../Context'
import './Auth.css'
import Button from '../../components/Button'

const Account = () => {
    const { state, setState } = useContext(MyContext);
    const { user, cart, products } = state;

    const navigate = useNavigate();
    useEffect(() => {
        if(!user.mail) {
            navigate('/login');
            setState({...state, toast: {text:"Login to manage your account", success:false} });
        } 
    }, [])
    function logOut(){
        axios.post('/users/logout')
        .then(() =>{
            setState({
                ...state, 
                toast:{text: `Logged out of ${user.username}'s account`, success: true},
                user:{username:"", email:"", avatar:"", cart:[], wishlist:[], orders:[]} })
            localStorage.removeItem('token');
            navigate('/login');
        })
        .catch(err => {
            setState({...state, toast:{text:err.message, success: false}})
        })
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const handleImage = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (e) => {
        setSelectedFile(e.target.result);
        };
    };
    return (
    <main className="max-sm:pb-[26vh] sm:px-[12vw] p-4 gap-2 flex max-md:flex-col justify-start">
        <section className='w-full h-full'>
            <div className="flex gap-3 items-center h-24">
                {/* AVATAR */}
                {user.avatar?
                <img className='rounded-full h-20 w-20' src={user.avatar} alt='' />
                :
                <div className="h-20 w-20 rounded-full flex items-center justify-center gap-2 bg-[var(--blue)]">
                    <h1 className='capitalize text-white'>{user.username.slice(0,1)}</h1>
                </div>}
                
                <div className='flex flex-col text-left overflow-x-scroll'>
                    <h2>{user.username}</h2>
                    <p className='mb-3'>{user.mail}</p>
                </div>
            </div>
        </section>

        <section className='flex items-center flex-col gap-2'>
            <span onClick={() => logOut()} className='min-w-[12rem] max-w-[20rem] w-full'><Button text={'Log out'}/></span>
            {user.role == 'admin' && <Link to="/admin" className='min-w-[12rem] max-w-[20rem] w-full'><Button text={'Admin Dashboard'}/></Link>}
            {/* {selectedFile && <img src={selectedFile} alt="Selected" />} */}
        </section>
    </main>
  )
}

export default Account