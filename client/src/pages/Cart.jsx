import React, {useContext} from 'react'
import { MyContext } from '../Context'

const Cart = () => {
    const { state, setState } = useContext(MyContext);
    const { theme, cart,news } = state;
    return (
    <main>
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