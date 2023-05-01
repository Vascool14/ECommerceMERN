import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
        .then((res) => setState({
            ...state, 
            toast:{text: res.message, succes: true},
            user:{username:"", email:"", avatar:"", cart:[], wishlist:[], orders:[]} }))
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
    <main className="auth p-4">

        <div className="flex items-center justify-between h-16">
            <h1>Hello, {user.username}!</h1>
            <img className='rounded-full h-full' src={user.avatar} alt='profile' />
        </div>
         
        <span onClick={() => logOut()} className='w-full my-2'>
            <Button text={'Log out'}/>
        </span>
        {selectedFile && <img src={selectedFile} alt="Selected" />}

        
        

    </main>
  )
}

export default Account