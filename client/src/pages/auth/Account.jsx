import React, { useContext} from 'react'

import { MyContext } from '../../Context'
import './Auth.css'
import Button from '../../components/Button'

const Account = () => {
    const { state, setState } = useContext(MyContext);
    const { user, cart, products } = state;

    if(!user){
        window.location.href = "/login"
    }
    const logOut = () => {
        setState({...state, user: {name: "", email: "", avatar: ""}});
        
    }
    return (
    <main className="auth">
        <h1>Hello, {user.name}!</h1> 
        {cart.length > 0 ? 
        <section>
            <h3>Your cart:</h3>
            {cart.map((item, index) => (
            <div key={index}>
                <h3>{item}</h3>
            </div>
            ))} 
        </section>
        : 
        <h3>No items added yet!</h3>}

        <Button press={logOut} text={'Log out'}/>
        
    </main>
  )
}

export default Account