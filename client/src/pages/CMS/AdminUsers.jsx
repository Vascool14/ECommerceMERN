import React, { useContext,useEffect, useState} from 'react'
import { MyContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import ProductPreview from '../../components/productPreview'
import { COLORS } from '../../utils/Constants'

const AdminUsers = () => {
    const { state } = useContext(MyContext);
    const { users, user, products } = state;
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token')||user.role !== 'admin') return navigate('/account');
    }, [])
    const [isEditor, setIsEditor] = useState(false);
    const [ localUser , setLocalUser ] = useState({});
    const [ wishlistItems, setWishlistItems ] = useState([]);
    const openUser = (user) => {
        setIsEditor(true);
        setLocalUser(user);
        setWishlistItems(products.list.filter(product => user.wishlist.includes(product._id)))
    }
    return (
    <>
        {/* MODAL */}
        {localUser.username && <div className="fixed w-screen z-10 h-screen centerAll transition-all" style={{transform: isEditor ? 'translateX(0)' : 'translateX(-150vw)'}} >
            <div className="w-screen h-screen absolute"onClick={()=> {if(isEditor) setIsEditor(false)}}></div>
            <section className='overflow-y-scroll border  rounded-xl bg-[var(--bg)] w-[96%] sm:w-4/5 max-w-[56rem] max-h-[78vh] z-10 p-2 max-sm:mb-20 sm:mt-16 flex flex-col gap-2'>
                <div key={localUser._id} className='center h-20 rounded-xl'>
                        <div className="h-full aspect-square rounded-lg centerAll bg-[var(--gray)]">
                            <h1 className='capitalize text-white'>{localUser.username.slice(0,1)}</h1>
                        </div>
                        
                        <div className='flex flex-col p-2 overflow-scroll'>
                            <h2>{localUser.username}</h2>
                            <p  className='underline cursor-pointer'  onClick={(e) => { e.preventDefault(); window.open(`mailto:${localUser.mail}?subject=Order%20Update&body=Good%20morning/afternoon/evening,%20your%20order%20has%20been%20....`, '_blank'); }}
                            >{localUser.mail}</p>
                        </div>
                </div>
            {/* orders */}
                <hr />
                {wishlistItems.length > 0 ? <>
                <h3 className='ml-1 capitalize'>{localUser.username}'s orders:</h3>
                <div className='flex gap-2 w-auto overflow-x-scroll pb-2 min-h-[18rem]'>
                    {wishlistItems.map((product) => (
                        <span key={product._id} className='relative min-w-[12rem] max-w-[min(12rem,40vw)]'>
                            <ProductPreview  product={product} />
                            <div className="z-10 opacity-0 hover:opacity-80 text-[var(--bg)] transition-all absolute inset-0 rounded-xl bg-[var(--text)] flex flex-col justify-center text-center gap-3 p-2">
                                <p className='font-semibold'>Status: <span className='text-[var(--primary)]'>shipping</span></p>
                                <p className='font-semibold'>Date: 12/12/2021</p>
                                <p className='font-semibold'>Id: 12094347236724</p>
                                <p className='font-semibold'>Total: &pound;{product.price}</p>                                
                            </div>
                        </span>
                    ))}
                </div>
                </> : <h3 className='ml-1'>User has no orders</h3>}
            {/* wishlist */}
                <hr />
                {wishlistItems.length > 0 ? <>
                <h3 className='ml-1 capitalize'>{localUser.username}'s wishlist:</h3>
                <div className='flex gap-2 w-auto overflow-x-scroll pb-2 min-h-[18rem]'>
                    {wishlistItems.map((product) => (
                        <span key={product._id} className='min-w-[12rem] max-w-[min(12rem,40vw)]'>
                            <ProductPreview  product={product} />
                        </span>
                    ))}
                </div>
                </> : <h3 className='ml-1'>User has no wishlist</h3>}

            </section>
        </div>}

        {/* main */}
        <main style={{filter: isEditor ? 'blur(4px)':'none'}}>
            <div className='mx-auto flex -mt-2 items-end justify-center gap-2'>
                <h1 className='ml-8'>All Users</h1>
                <p className='mb-3'>(Newest First)</p>
            </div>
            <section className='w-full grid md:grid-cols-2 xl:grid-cols-3 gap-2'>
                {users.length > 0 && [...users].reverse().map((user) => (
                    <div key={user._id} className='center h-20 bg-[var(--gray)] p-2 rounded-xl cursor-pointer' 
                    onClick={() => openUser(user)}>
                        <div className="h-full aspect-square rounded-lg centerAll 
                        justify-center bg-[var(--gray)]">
                            <h1 className='capitalize text-white'>{user.username.slice(0,1)}</h1>
                        </div>
                        
                        <div className='flex flex-col p-2 overflow-scroll'>
                            <h2>{user.username}</h2>
                            <p>{user.mail}</p>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    </>
  )
}

export default AdminUsers