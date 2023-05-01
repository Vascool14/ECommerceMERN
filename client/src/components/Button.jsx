import React from 'react'

const Button = ({text, disabled}) => {
  const styles = `
  .primaryBtn{
    background-color: var(--text);
    color: var(--bg);
    overflow: hidden !important;
    border-radius: 0.75rem;
    padding: 0.6rem 1.4rem;
    border: none;
    position: relative;
    cursor: pointer;
    width: 100%;
  }
  .primaryBtn span:not(:nth-child(6)) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 3rem;
    width: 3.4rem;
    background-color: ${disabled? 'red' : 'var(--blue)'};
    border-radius: 50%;
    transition: .3s ease;
  }
  .primaryBtn span:nth-child(1) {    transform: translate(-3.3rem, -6rem);   }
  .primaryBtn span:nth-child(2) {    transform: translate(-6rem, 4rem);   }
  .primaryBtn span:nth-child(3) {    transform: translate(-.2rem, 3.8rem);   }
  .primaryBtn span:nth-child(4) {    transform: translate(3.5rem, 3.8rem);   }
  .primaryBtn span:nth-child(5) {    transform: translate(3.6rem, -4.8rem);  }
  .primaryBtn:hover span:not(:nth-child(6)) {
    transform: translate(-50%, -50%) scale(6);
    transition: 2s ease;
  }   
  .disabled{ animation: shake 0.5s; }
  @keyframes shake{
    0%, 50%, 100% { transform: translateX(5px); }
    25%, 75% { transform: translateX(-5px); }
  }`
  return (
    <>
    <style>{styles}</style>
    <button className='primaryBtn'>
        <span></span><span></span><span></span><span></span><span></span>
        <span className="text relative">{text}</span>
    </button>
    </>
  )
}

export default Button