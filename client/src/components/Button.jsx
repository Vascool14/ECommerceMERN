import React, {useRef} from 'react'

const Button = ({text, disabled, press}) => {
    const styles = `
    button {
        padding: 0.6rem 1.4rem;
        border: none;
        border-radius: .6rrem;
        position: relative;
        cursor: pointer;
        overflow: hidden;
      }
      button span:not(:nth-child(6)) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 30px;
        width: 30px;
        background-color: ${disabled? 'red':'var(--blue)'};
        border-radius: 50%;
        transition: .3s ease;
      }
      button span:nth-child(6) {     position: relative;    }
      button span:nth-child(1) {    transform: translate(-3.3rem, -6rem);   }
      button span:nth-child(2) {    transform: translate(-6rem, 4rem);   }
      button span:nth-child(3) {    transform: translate(-.2rem, 3.8rem);   }
      button span:nth-child(4) {    transform: translate(3.5rem, 3.8rem);   }
      button span:nth-child(5) {    transform: translate(3.5rem, -4.8rem);  }
      button:hover span:not(:nth-child(6)) {
        transform: translate(-50%, -50%) scale(11);
        transition: 2s ease;
      }   
      .disabled{  animation: shake 0.5s; }
      @keyframes shake{
        0%, 50%, 100% { transform: translateX(5px); }
        25%, 75% { transform: translateX(-5px); }
    }`
    const buttonRef = useRef()
    const handleClick = (e) => {
      e.preventDefault();
      if(disabled){
        buttonRef.current.classList.add('disabled');
        setTimeout(() => {buttonRef.current.classList.remove('disabled')}, 500)
      }
      else press();
    }
  return (
    <>
    <style>{styles}</style>
    <button ref={buttonRef} onClick={(e)=> handleClick(e)}className='bg-[var(--text)] text-[var(--bg)] rounded-xl'>
        <span className="circle1"></span>
        <span className="circle2"></span>
        <span className="circle3"></span>
        <span className="circle4"></span>
        <span className="circle5"></span>
        <span className="text font-semibold">{text}</span>
    </button>
    </>
  )
}

export default Button