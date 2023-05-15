import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { MyContext } from '../../Context'
import './Auth.css'
import Button from '../../components/Button'

const Account = () => {
    const { state, setState } = useContext(MyContext);
    const { user } = state;
    
    const [ isVisible , setIsVisible ] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
            setState({...state, toast:{text:"Login to manage your account", success: false}})
        }
        else setIsVisible(true);
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
    const fileInputRef = useRef();
    const handleImage = () => {
        fileInputRef.current.click();
        //wait for user to select file
        fileInputRef.current.onchange = () => {
            setSelectedFile(fileInputRef.current.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(fileInputRef.current.files[0]);
            reader.onloadend = () => {
                setState({...state, user:{...state.user, avatar: reader.result}, toast:{text:"Profile picture updated!", success:true}})
                // axios.patch('/users/avatar', {avatar: reader.result}, {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}})
                // .then(res => {
                //     setState({...state, user:{...state.user, avatar: res.data.avatar||state.data.avatar}, toast:{text:"Profile picture updated!", success:true}})
                // })
                // .catch(err => {
                //     setState({...state, toast:{text:"Failed to upload image", success: false}})
                // })
            };
        };
    };
    if(isVisible) return (
    <main className="max-sm:pb-[26vh] sm:px-[12vw] p-4 gap-2 flex max-md:flex-col justify-start">
        <section className='w-full h-full'>
            <div className="flex gap-3 items-center h-24">
                {/* AVATAR */}
                <div className="w-20 h-20 relative flex items-center justify-center rounded-full overflow-hidden cursor-pointer" 
                onClick={handleImage}>
                    {user.avatar?
                    <img className='w-full h-full bg-[var(--blue)]' src={user.avatar} alt='' />
                    :
                    <div className="w-full h-full flex items-center justify-center gap-2 bg-[var(--blue)]">
                        <h1 className='capitalize text-white'>{user.username.slice(0,1)}</h1>
                    </div>
                    }
                    {/* Change Avatar */}
                    <input ref={fileInputRef} type="file" className="hidden"/>
                </div>                
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