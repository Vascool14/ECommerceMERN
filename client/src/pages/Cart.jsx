import React, {useContext, useEffect} from 'react'
import { MyContext } from '../Context'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import ProductPreview from '../components/productPreview'
import Button from '../components/Button'

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
        <h1>Your cart</h1>
        {user.cart.length > 0 ? 
        <div className='grid gap-2 max-sm:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]'>
            {cartProducts.map((product) => (
                <Link to={`/products/${product._id}`} className='max-w-[18rem]' 
                key={product._id} state={{ background:location }}>
                    <ProductPreview product={product} />
                </Link>
            ))}
        </div>
        :
        <div className="flex-col centerAll">
            <h2 className='text-center mt-[30vh] gap-2'>No items added yet!</h2>
            <Link to='/products' className='text-center w-[20rem]'>
                <Button text='Shop Now'/>
            </Link>
        </div>
        }
        <Link to='/checkout' className='text-center w-[20rem]'><Button text={'Continue to checkout'} /></Link>
    </main>
    )
}

export default Cart