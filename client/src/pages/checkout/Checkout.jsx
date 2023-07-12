import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../Context';
import ProductPreview from '../../components/productPreview';
import './Checkout.css'
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function Checkout() {
    const { state, setState } = useContext(MyContext);
    const user = state.user;
    const documentTitle = state.documentTitle;
    useEffect(() => {
        setState({...state, documentTitle: {...documentTitle, after: ' - Checkout'}})
        return () => {
            setState({...state, documentTitle: {...documentTitle, after: ''}})
        }
    }, [])
    const cartItems = state.products.list.filter(product => user.cart.includes(product._id))
    // const [shipping, setShipping] = useState({
    //     name: user.name,
    //     address: user.address,
    //     city: user.city,
    //     country: user.country,
    //     postalCode: user.postalCode,
    // })
    return (
        <main className='flex flex-col'>
            {/* Progress bar */}
            <div className='centerAll w-full gap-[1vw] font-medium py-1'>
                <span className='text-[var(--primary)]'>Summary</span>
                <div className="line" style={{backgroundColor: 'var(--primary'}}></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--primary)" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="line"></div>
                <span>Shipping</span>
                <div className="line"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="line"></div>
                <span>Payment</span>
            </div>

            <h2>Summary</h2>
            {cartItems.length > 0 && 
            <section className='flex gap-3 h-[20rem] w-[12rem]'>
                {cartItems.map(item => (
                    <ProductPreview product={item} key={item._id} />
                ))}
            </section>}
            <div className="flex gap-3 w-full justify-between mt-auto">
                <Link to='/checkout' className='max-w-[10rem]'>
                    <Button text='<  Back'/>
                </Link>
                
                <Link to='/checkout/shipping' className='max-w-[10rem]'>
                    <Button text='Next  >'/>
                </Link>
            </div>
        </main>
    )
}

export default Checkout