import { Link, useLocation } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react';
import { MyContext } from '../Context';

const Navbar = () => {
  const { state, setState } = useContext(MyContext);
  const { menuOpen, modalOpen, news, user } = state;
  
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

        <nav className={`${!visible && !modalOpen && 'sm:-translate-y-[200%]'}`}>
          {/* HAMBURGER */}
          <div onClick={()=>  setState({...state, menuOpen: !menuOpen})} className='max-sm:order-1 svgContainer cursor-pointer z-10'>
            <svg fill={'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          </div>
          {/* <button type='button' onClick={() => setState({...state, searchOpen: !searchOpen})}>
            <svg fill={location.pathname==='/search'?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          </button> */}

          {/* LOGO */}
          <Link to='/' className='max-sm:order-3'>
            <h4 className='text-[var(--blue)] font-bold'>Logo</h4>
          </Link>

          {/* WISHLIST */}
          <Link to="/wishlist" className='svgContainer sm:ml-auto max-sm:order-2'>
            <svg fill={location.pathname==='/wishlist'?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
            <div className='topPin'>{user.wishlist.length}</div>
          </Link>

          {/* CART */}
          <Link to="/cart" className='svgContainer max-sm:order-4'>
            <svg fill={location.pathname==='/cart'?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
            <div className='topPin'>{user.cart.length}</div>
          </Link>

          {/* ACCOUNT */}
          <div className='max-sm:order-5'>
            {user.username ? 
            <Link to={'/account'} className="svgContainer account rounded-full h-8 w-8 border-2" 
            style={{borderColor: (location.pathname==='/account') ?'var(--text)':'var(--bg)'}}>
              {user.avatar ?
                <img className='h-full w-full rounded-full' src={user.avatar} alt='' />
                :
                <div className="rounded-full bg-[var(--blue)] flex items-center h-full w-full justify-center">
                  <h4 className='uppercase text-white'>{user.username.slice(0,1)}</h4>
                </div>
              }
            </Link>

            :<Link to={'/login'} className='svgContainer'>
              <svg fill={(location.pathname=='/login'||location.pathname=='/register')?'var(--text)':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </Link>}
          </div>
        </nav>
      
      </header>
  )
}

export default Navbar