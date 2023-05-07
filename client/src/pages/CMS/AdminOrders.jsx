import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../Context'

const AdminOrders = () => {
    const { state, setState } = useContext(MyContext);
    const { orders, users, products } = state;
    const navigate = useNavigate();
    useEffect(() => {
        if(state.user.role !== 'admin') navigate('/');
        if(!products&& state.user.role === 'admin') navigate('/admin');
    }, [])
    const [ isEditor , setIsEditor ] = useState(false);
    const openEditor = (id) => {
      setIsEditor(true);
    }
    return (
    <main className='bg-[var(--secondBg)]'>
        <h1>All Orders</h1>
        <section className='grid max-sm:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-3'>
            {/* Orders */}
            {orders.length > 0 && orders.map(order => (
                <div key={order._id} state={{ background: location }} className='h-full' onClick={()=>openEditor(order._id)}>
                  <p>Order 69</p>
                </div>
            ))}
        </section>
        {/* EDITOR */}
        <section style={{transform: isEditor? 'traslateX(0)':'translateX(100vw)'}} className='fixed w-[90vw] h-[80vh] rounded-xl bg-red-500'>
            <h2>Edit product</h2>
        </section>
    </main>
  )
}

export default AdminOrders