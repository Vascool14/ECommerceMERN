import React, { useContext, useEffect, lazy } from 'react'
import { MyContext } from '../../Context'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
const Button = lazy(() => import('../../components/Button'))

export default function AdminPanel(){
    const { state , setState } = useContext(MyContext);
    const navigate = useNavigate();
    useEffect(() => {
      if(!localStorage.getItem('token') || state.user.role!=='admin') navigate('/login');
    }, [])
    return ( 
    <main className='max-sm:p-4 flex items-center justify-center'>
      {state.user.role=='admin' &&
      <section className='flex gap-2 flex-col max-w-[20rem] mb-6 text-center'>
        <h1>Admin&nbsp;Panel</h1>
        <Link to="/admin/orders">
          <Button text='Orders'/>
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
        <p className='text-[var(--blue)] mt-3'>Actions performed from the "admin" route will change database data</p>
      </section>}
    </main>
  )
}