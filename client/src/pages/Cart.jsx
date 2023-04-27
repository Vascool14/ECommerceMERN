import React, {useContext, useEffect} from 'react'
import { MyContext } from '../Context'
import { Navigate } from 'react-router-dom'

const Cart = () => {
    const { state, setState } = useContext(MyContext);
    const { cart, products, user } = state;
    if(!user.mail) {
        useEffect(() => setState({...state, toast: {"text":"Login to view the cart", "succes":false} }), [])
        return <Navigate to='/login' />
    }
    return (
    <main className='p-4'>
        <h2>Cart</h2>
        {cart.length > 0 ? 
        <div>
            {cart.map((item, index) => (
                <div key={index}>
                    <h3>{item}</h3>
                </div>
            ))}
        </div>
        :<h2>No items added yet!</h2>
        }
    </main>
  )
}

export default Cart