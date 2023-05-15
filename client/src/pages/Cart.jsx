import React, {useContext, useEffect} from 'react'
import { MyContext } from '../Context'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import ProductPreview from '../components/productPreview'

const Cart = () => {
    const { state, setState } = useContext(MyContext);
    const { user, products } = state;
    const navigate = useNavigate();
    useEffect(() => {
        if(!user.mail) {
            setState({...state, toast: {text:"Login to view the cart", success:false} });
            navigate('/login');
        }
    }, [])
    const cartProducts = products.list.filter(product => user.cart.includes(product._id))
    const location = useLocation();
    return (
    <main style={{opacity: user.mail?1:0}}>
        <h2>Cart</h2>
        {user.cart.length > 0 ? 
        <div className='grid gap-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]'>
            {cartProducts.map((product) => (
                <Link to={`/products/${product._id}`} 
                key={product._id} state={{ background:location }}>
                    <ProductPreview product={product} />
                </Link>
            ))}
        </div>
        :<h2>No items added yet!</h2>
        }
    </main>
  )
}

export default Cart