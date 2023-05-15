import React, { useContext } from 'react'
import { MyContext } from '../Context';
import { Link } from 'react-router-dom'
import './Components.css'

const Menu = () => {
    const styles = `
    .container { width:50px;  height:31px;  position:relative; } 
    .checkbox { opacity:0;  width:0;  height:0;  position:absolute; } 
    .switch {  width:100%;  height:100%;  display:block;  background-color:#dfdfdf; border-radius:16px; cursor:pointer; transition: all 0.2s ease-out; }
    .slider {  width: 27px;  height: 27px; position: absolute;  left: calc(50% - 23px); top: calc(50% - 27px/2);
        border-radius:50%;  background:#fff;  box-shadow:0px 3px 8px #0002, 0px 3px 1px #0001;
        transition: all 0.2s ease-out;  cursor:pointer; }
    .checkbox:checked + .switch {  background-color:var(--blue); }
    .checkbox:checked + .switch .slider {   left:calc(50% - 4px);  top:calc(50% - 27px/2); }
    `
    const {state, setState} = useContext(MyContext)
    const { menuOpen, theme, toast} = state;
    const toggleTheme = () => {
        const newTheme = ( theme =='dark' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', newTheme );
        document.querySelector('meta[name="theme-color"]').setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--sky'));
        localStorage.setItem( 'data-theme', newTheme );
        setState({...state, theme: newTheme, toast: {"text": `Theme set to ${newTheme}`, success: true }});
        if(theme == "light") navigator.vibrate(50);
    }
    return ( 
    <>    
        <aside style={{transform: menuOpen? 'translateX(0)':'translateX(-110%)'}}
            className='fixed p-4 py-6 w-[calc(15rem+8vw)] h-[100vh] bottom-0 left-0 sm:pt-[calc(var(--navHeight)+2rem)]
            flex flex-col gap-2 transition-all duration-300 
            bg-[var(--bg)] z-[99]'>
            <style>{styles}</style>
            <h2 className='px-4'>Menu</h2>
            <div className='toggleSection'>
                <h4 className='ml-1'>Theme</h4>
                <div className="container">
                    <input type="checkbox" checked={theme=="dark"} onChange={() => toggleTheme()} className="checkbox" id="checkbox1"/>
                    <label className="switch" htmlFor="checkbox1"><span className="slider"></span></label>
                </div>
            </div>
            <h2 className='px-4'>Categories</h2>
            <div className='flex flex-col gap-2 m-4' onClick={() => setState({...state, menuOpen: false})}>
                {/*All  */}
                <Link to='/products'>All</Link>
                {/*Categories  */}
                <Link to='/products?category=skin'>Skin</Link>
                <Link to='/products?category=hair'>Hair</Link>
                <Link to='/products?category=body'>Body</Link>
                <Link to='/products?category=makeup'>Makeup</Link>
                <Link to='/products?category=fragrance'>Fragrance</Link>
                <Link to='/products?category=tools'>Tools</Link>
                <Link to='/products?category=wellness'>Wellness</Link>
            </div>
        </aside>
        {menuOpen && 
        <div onClick={() => setState({...state, menuOpen: false})} 
        className='w-screen h-screen bg-black/[0.4] fixed top-0 left-0 z-[98]'></div>}
    </>

  )
}

export default Menu