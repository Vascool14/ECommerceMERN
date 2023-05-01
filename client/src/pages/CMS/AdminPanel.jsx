import React, { useState, useContext, useEffect } from 'react'
import { MyContext } from '../../Context'
import axios from 'axios'

const AdminPanel = () => {
    const { state , setState } = useContext(MyContext);
    const { user, products } = state;
    useEffect(() => {
      axios.get('/admin', { withCredentials: true })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    }, [])


    return (
    <main>
        <h1>Admin Panel</h1>
    </main>
  )
}

export default AdminPanel