import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { MyContext } from '../../Context'
import './Auth.css'
import Button from '../../components/Button'
import ProductPreview from '../../components/productPreview'
import { getMonthAndDate } from '../../utils/Functions'

const Account = () => {
    const { state, setState } = useContext(MyContext);
    const { user, products } = state;
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
                toast:{text: `Logged out of ${user.username.split(' ')[0]}'s account`, success: true},
                user:{username:"", email:"", avatar:"", cart:[], wishlist:[], orders:[]} })
            localStorage.removeItem('token');
            navigate('/login');
        })
        .catch(err => {
            setState({...state, toast:{text:err.message, success: false}})
        })
    }
    const orderedProducts = user.orders? products.list.filter(product => user.orders.includes(product._id)):[];
    if(isVisible) return (
    <main className="flex flex-col gap-2">
        {/* Avatar */}
        <div className="flex items-center gap-3 h-24">
            <div className="w-[5rem] h-[5rem] min-w-[5rem] flex bg-[var(--primary)]
            centerAll rounded-full overflow-hidden">
                <h1 className='capitalize text-white'>{user.username.slice(0,1)}</h1>
            </div> 
            {user.username &&               
            <div className='flex flex-col text-left overflow-x-scroll'>
                <h2>{user.username}</h2>
                <p className='opacity-50 mb-2'>{user.mail}<br />User since {getMonthAndDate(user.createdAt)}</p>
            </div>}
        </div>

        <hr />
        {/* Orders */}
        {user.orders && user.orders.length > 0 && 
        <section>
            <h2>My orders</h2>
            <div className='grid w-full gap-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]'>
            {orderedProducts.map((product) => (
                <span className='max-w-[50%]' key={product._id}>
                    <ProductPreview product={product} />
                </span>
            ))}
            </div>
        </section>}

        
        {/* Log out */}
        <span onClick={() => logOut()} className='mt-auto mx-auto min-w-[12rem] max-w-[20rem] w-full'><Button text={'Log out'}/></span>
    </main>
  )
}

export default Account