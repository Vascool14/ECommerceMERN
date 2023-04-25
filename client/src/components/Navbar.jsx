import { Link, useLocation } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react';
import { MyContext } from '../Context';

const Navbar = () => {
  const { state, setState } = useContext(MyContext);
  const { menuOpen, searchOpen, theme, news, user, cart, wishlist } = state;
  
  // make navbar appear when scrolling up
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible((prevScrollPos >= currentScrollPos) || currentScrollPos < 50);
    setPrevScrollPos(currentScrollPos);
  }
  window.addEventListener('scroll', handleScroll);

  // make adverts change at the top
  const [ newsId, setNewsId ] = useState(0);
  useEffect(()=>{
    const interval = setInterval(()=>{
      setNewsId(newsId => newsId < news.list.length-1 ? newsId+1 : 0);
    }, 7000);
    return () => clearInterval(interval);
  },[news.list.length])
  
  const location = useLocation();
  return (
    <header className='fixed max-sm:bottom-0 left-0 flex-row sm:top-0 sm:flex-col w-screen z-[100] transition-all duration-200'>
      
        <section className={`${!news.show && 'hidden'} bg-[var(--blue)] z-10 text-[var(--bg)] w-screen flex items-center justify-center relative`}>
          <p>{news.list[newsId]}</p>
          <div onClick={()=> setState({...state,news:{...news,show:!news.show}})}
          className='absolute right-[0.1rem] cursor-pointer'>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--bg)'} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </div>
        </section>

        <nav className={`${!visible && 'sm:-translate-y-[200%]'}`}>
          <div onClick={()=>  setState({...state, menuOpen: !menuOpen})} className='max-sm:order-1 svgContainer cursor-pointer z-10'>
            <svg fill={'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          </div>
          {/* <button type='button' onClick={() => setState({...state, searchOpen: !searchOpen})}>
            <svg fill={location.pathname==='/search'?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          </button> */}
          <Link to='/' className='max-sm:order-3'>
            <h4 className='text-[var(--blue)] font-bold'>Logo</h4>
          </Link>

          <Link to="/wishlist" className='svgContainer sm:ml-auto max-sm:order-2'>
            <svg fill={location.pathname==='/wishlist'?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
            <div className='topPin'>{wishlist.length}</div>
          </Link>
          <Link to="/cart" className='svgContainer max-sm:order-4'>
            <svg fill={location.pathname==='/cart'?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
            <div className='topPin'>{cart.length}</div>
          </Link>
          <div className='max-sm:order-5'>
            {user.avatar ? 
            <Link to={'/account'} className="svgContainer account rounded-full h-8 w-8 border-2" 
            style={{borderColor: location.pathname==='/account' ?'var(--blue)':'var(--bg)'}}>
              <img className='h-full w-full rounded-full' src={user.avatar} alt='profile' />
            </Link>

            :<Link to={'/login'} className='svgContainer'>
              <svg fill={(location.pathname.slice(0,8)==='/account'||location.pathname=='/login'||location.pathname=='/register')?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </Link>}
          </div>
        </nav>
      
      </header>
  )
}

export default Navbar