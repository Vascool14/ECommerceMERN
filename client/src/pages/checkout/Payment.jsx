import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../Context';
import './Checkout.css'
import '../auth/Auth.css'
import './Card.css'
import Cards from './Cards';
import CheckoutButton from './CheckoutButton';

const Payment = () => {
    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [date, SetDate] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");

    const { state, setState } = useContext(MyContext);
    const user = state.user;
    const documentTitle = state.documentTitle;
    useEffect(() => {
        setState({...state, documentTitle: {...documentTitle, after: ' - Payment'}})
        return () => {
            setState({...state, documentTitle: {...documentTitle, after: ''}})
        }
    }, [])
    return (
    <main className='flex flex-col gap-2'>
        {/* progress bar */}
        <div className='centerAll justify-between w-full gap-[1vw] font-medium py-1'>
                <span className='text-[var(--primary)]'>Summary</span>
                <div className="line" style={{backgroundColor: 'var(--primary'}}></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--primary)" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="line" style={{backgroundColor: 'var(--primary'}}></div>
                <span className='text-[var(--primary)]'>Shipping</span>
                <div className="line" style={{backgroundColor: 'var(--primary'}}></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--primary)" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="line" style={{backgroundColor: 'var(--primary)'}}></div>
                <span className='text-[var(--primary)]'>Payment</span>
        </div>
        <section className="flex flex-row-reverse max-md:flex-col w-full gap-2">
            {/* card form */}
            <div className="centerAll flex-col gap-4">
                <div className="rccs__card rccs__card--unknown">
                    <Cards number={number} name={name} expiry={date} cvc={cvc} focused={focus}/>
                </div>
                <form>
                    <div className="input-group">
                        <input
                        type="text"
                        className="form-control"
                        value={number}
                        name="number"
                        onChange={(e) => {
                            SetNumber(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                        <label htmlFor="name">Card Number</label>
                    </div>
                    <div className="input-group">
                        <input
                        type="text"
                        className="form-control"
                        value={name}
                        name="name"
                        onChange={(e) => {
                            SetName(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                        <label htmlFor="name">Card Name</label>
                    </div>
                    <div className="input-group">
                        <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        value={date}
                        onChange={(e) => {
                            SetDate(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                        <label htmlFor="name">Expiration Date</label>
                    </div>
                    <div className="input-group">
                        <input
                        type="tel"
                        name="cvc"
                        maxLength={3}
                        className="card"
                        value={cvc}
                        onChange={(e) => {
                            SetCvc(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                        <label htmlFor="name">CVV</label>
                    </div>
                    <CheckoutButton />
                </form>
            </div>
            <div className="bg-[var(--secondBg)]">
                <h1> Alias maxime, velit eaque distinctio quia aperiam tenetur doloribus autem natus at.</h1>
            </div>
        </section>
    </main>
    );
};
export default Payment;
