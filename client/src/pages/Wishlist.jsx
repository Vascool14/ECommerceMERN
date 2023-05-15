import React, {useContext, useEffect} from 'react'
import { MyContext } from '../Context'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import ProductPreview from '../components/productPreview'

const Wishlist = () => {
    const { state, setState } = useContext(MyContext);
    const { user, products } = state;
    const navigate = useNavigate();
    if(!user.mail) {
        useEffect(() => {
            setState({...state, toast: {text:"Login to view the wishlist", success:false} });
            navigate('/login');
        }, [])
    }
    const wishlistProducts = products.list.filter(product => user.wishlist.includes(product._id));
    const location = useLocation();
    return (
    <main style={{opacity: user.mail?1:0}}>
        <h2>Wishlist</h2>
        {user.wishlist.length > 0 ? 
        <div className='grid gap-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]'>
            {wishlistProducts.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id} state={{ background:location }}>
                    <ProductPreview product={product} />
                </Link>
            ))}
        </div>
        :<h2>No items added yet!</h2>
        }
    </main>
  )
}

export default Wishlist