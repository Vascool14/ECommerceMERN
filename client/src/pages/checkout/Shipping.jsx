import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../Context';
import './Checkout.css'
import '../auth/Auth.css'
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

function Shipping() {
    const { state, setState } = useContext(MyContext);
    const [ form , setForm ] = useState({
        name: '',
        address: ''
    })
    const user = state.user;
    const documentTitle = state.documentTitle;
    useEffect(() => {
        setState({...state, documentTitle: {...documentTitle, after: ' - Shipping'}})
        return () => {
            setState({...state, documentTitle: {...documentTitle, after: ''}})
        }
    }, [])
    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                address: user.address
            })
        }
    }, [user])
    useEffect(() => {
        if (form.name?.length > 4 && form.address?.length > 8) {
            setIsDone(true)
        } else {
            setIsDone(false)
        }
    }, [form])
    const [isDone, setIsDone] = useState(false);
    return (
        <main className='flex flex-col'>
            {/* Progress bar */}
            <div className='centerAll justify-between w-full gap-[1vw] font-medium py-1'>
                <span className='text-[var(--primary)]'>Summary</span>
                <div className="line" style={{backgroundColor: 'var(--primary'}}></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--primary)" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="line" style={{backgroundColor: 'var(--primary'}}></div>
                <span className='text-[var(--primary)]'>Shipping</span>
                <div className="line" style={{backgroundColor: isDone? 'var(--primary':'var(--text)'}}></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="line"></div>
                <span>Payment</span>
            </div>
            <h2>Shipping details</h2>
            <section className='centerAll auth'>
                <form className='flex flex-col gap-2'>
                    <div className="input-group">
                        <input
                            required
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                        />
                        <label className="user-label">Name</label>
                    </div>
                    <div className="input-group">
                        <input
                            required
                            type="text"
                            name="address"
                            autoComplete="address"
                            value={form.address}
                            onChange={(e) => setForm({...form, address: e.target.value})}
                        />
                        <label className="user-label">Address</label>
                    </div>
                </form>
            </section>
            <div className="flex gap-3 w-full justify-between mt-auto">
                <Link to='/checkout' className='max-w-[10rem]'>
                    <Button text='< Back'/>
                </Link>
                
                <Link to='/checkout/payment' className='max-w-[10rem]'>
                    <Button disabled={form.address?.length > 8 && form.name?.length > 4} text='Next >'/>
                </Link>
            </div>
        </main>
    )
}

export default Shipping