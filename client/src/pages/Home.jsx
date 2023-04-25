import React, { useContext } from 'react';
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
        <h4>ntium, sit sunt placeat ea natus. t amet consectetur adipisicing elit. Voluptatem repellat perspiciatis quo voluptas fugit numquam neque, officia natus quidem eligendi porro, assumenda corrupti quas? Doloremque sint earum commodi suscipit sunt!</h4>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aspernatur praesentium ut tenetur esse placeat repudiandae nisi autem alias eaque.</h3>
      </div>
    </main>
  )
}

export default Home