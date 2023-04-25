import React, { useContext } from 'react'
import { MyContext } from '../Context';
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
    let { menuOpen, theme} = state;
    const toggleTheme = () => {
        const newTheme = ( theme =='dark' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', newTheme );
        document.querySelector('meta[name="theme-color"]').setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--sky'));
        localStorage.setItem( 'data-theme', newTheme );
        setState({...state, theme: newTheme });
        if(theme == "light") navigator.vibrate(50);
    }
    return ( 
    <>    
        <aside style={{transform: menuOpen? 'translate(0, -50%)':'translate(-110%, -50%)'}} 
            className='fixed p-4 py-6 w-[calc(14rem+2vw)] top-1/2 left-0 flex flex-col gap-2 transition-all duration-300 justify-center 
            rounded-r-xl bg-white/[0.2] backdrop-blur-[3px] border border-l-0 border-white/[0.4] z-[102]'>
            <style>{styles}</style>
            <h2 className='px-4 pb-1'>Menu</h2>
            <div className='toggleSection'>
                <h4 className='ml-1'>Theme</h4>
                <div className="container">
                <input type="checkbox" checked={theme=="dark"} onChange={() => toggleTheme()} className="checkbox" id="checkbox1"/>
                    <label className="switch" htmlFor="checkbox1"><span className="slider"></span></label>
                </div>
            </div>
        </aside>
        {menuOpen && 
        <div onClick={() => setState({...state, menuOpen: !menuOpen})} 
        className='w-screen h-screen bg-black/[0.2] fixed top-0 left-0 z-[101]'></div>}
    </>

  )
}

export default Menu