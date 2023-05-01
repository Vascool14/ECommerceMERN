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
        .then((res) =>{
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
    <main className="auth p-4 flex max-sm:flex-col items-center justify-center">
        <section className='w-full bg-red-200'>
            <div className="flex flex-col gap-2 items-center justify-between w-full">
                <h1>{user.username}</h1>
                <img className='rounded-full h-full' src={user.avatar} alt='' />
                {user.role == 'admin' && <Link to="/admin">Admin Dashboard</Link>}
            </div>
        </section>

        <section className='w-full'>
            <span onClick={() => logOut()} className='w-full my-2'>
                <Button text={'Log out'}/>
            </span>
            {/* {selectedFile && <img src={selectedFile} alt="Selected" />} */}
        </section>
    </main>
  )
}

export default Account