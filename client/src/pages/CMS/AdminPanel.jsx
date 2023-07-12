import React, { useContext, useEffect, lazy } from 'react'
import { MyContext } from '../../Context'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Button = lazy(() => import('../../components/Button'))

export default function AdminPanel(){
    const { state, setState } = useContext(MyContext);
    const navigate = useNavigate();
    useEffect(() => {
      if(!localStorage.getItem('token') || state.user.role!=='admin') navigate('/login');
      axios.get('/admin/users', {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setState({
            ...state, 
            users: [...res.data.users],
            toast:{text:res.data.message, success:true} }) 
        })
        .catch(err => {
            setState({...state, toast:{text:err.response.data.message, success:false}});
            navigate('/account')
        })
    }, [])
    return ( 
    <main className='max-sm:p-4 centerAll'>
      {state.user.role=='admin' &&
      <section className='flex gap-2 flex-col max-w-[20rem] text-center'>
        <h1>Admin&nbsp;Panel</h1>
        <Link to="/admin/orders">
          <Button text='Orders'/>
        </Link>
        <Link to="/admin/messages">
          <Button text='Messages'/>
        </Link>
        <Link to="/admin/products">
          <Button text='Edit Products'/>
        </Link>
        <Link to="/admin/users">
          <Button text='View Users'/>
        </Link>
        <Link to="/admin/other">
          <Button text='Other'/>
        </Link>
        <p className='text-[var(--primary)] mt-3'>Actions performed from the "admin" route will change database data</p>
      </section>}
    </main>
  )
}