import React, {useContext, useEffect} from 'react'
import { MyContext } from '../Context'
import { Navigate } from 'react-router-dom'

const Wishlist = () => {
    const { state, setState } = useContext(MyContext);
    const { wishlist, products, user } = state;
    if(!user.mail) {
        useEffect(() => setState({...state, toast: {"text":"Login to view the wishlist", "succes":false} }), [])
        return <Navigate to='/login' />
    }
    return (
    <main className='p-4'>
        <h2>Wishlist</h2>
        {wishlist.length > 0 ? 
        <div>
            {wishlist.map((item, index) => (
                <div key={index}>
                    <h4>{item}</h4>
                </div>
            ))}
        </div>
        :<h2>No items added yet!</h2>
        }
    </main>
  )
}

export default Wishlist