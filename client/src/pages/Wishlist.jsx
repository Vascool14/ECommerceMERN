import React, {useContext} from 'react'
import { MyContext } from '../Context'

const Wishlist = () => {
    const { state, setState } = useContext(MyContext);
    const { wishlist, products } = state;
    return (
    <main>
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