import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context';
import './Pages.css'
import { Link } from 'react-router-dom';

const Home = () => {
  const { state, setState } = useContext(MyContext);
  return (
    <main>
      <h1>Home</h1>
      <Link to="/products" className='p-4 rounded-xl bg-[var(--text)] text-[var(--bg)]'>Products</Link>
      <div className='p-10 overflow-hidden bg-[var(--bg)] border-t-2'>
      </div>
    </main>
  )
}

export default Home