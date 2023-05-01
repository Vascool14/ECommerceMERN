import React, {useContext, useEffect} from 'react'
import { MyContext } from '../Context'
import { useNavigate, Link, useLocation } from 'react-router-dom'

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
    <main className='p-4' style={{opacity: user.mail?1:0}}>
        <h2>Wishlist</h2>
        {user.wishlist.length > 0 ? 
        <div className='grid gap-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]'>
            {wishlistProducts.map((product) => (
                <Link to={`/products/${product._id}`} 
                key={product._id} state={{ background:location }}
                className='rounded-3xl p-3 flex flex-col bg-[var(--bg)] gap-2 text-[var(--text)]
                 hover:shadow-md shadow-[var(--text)] cursor-pointer relative'>
                    <div className='rounded-xl aspect-[3/4] mb-auto overflow-hidden relative'>
                        <img className='transition-all duration-300 h-full object-cover' src={product.images[0]} width={'100%'} alt="" />
                    </div>
                    <h4>{product.title} - ${product.price}</h4>
                    <div className="flex justify-between items-center">
                        <p>{product.description}</p>
                        <div className="svgContainer flex items-center justify-center absolute bottom-0 right-0 m-2">
                            <svg fill={Math.round(Math.random()*3)%3==0?'red':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--bg)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                        </div>
                    </div>
                   
                </Link>
            ))}
        </div>
        :<h2>No items added yet!</h2>
        }
    </main>
  )
}

export default Wishlist