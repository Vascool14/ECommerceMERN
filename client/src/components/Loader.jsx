const Loader = () => {
    return (
    <>
      <style>
        {`
        .loader {
          width: 50px;
          height: 50px;
          position: relative;
          z-index: 1;
          transform: translateX(-50%);
        }
        .loader::before,.loader::after {
          content: '';
          position: absolute;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          animation: loader 1s infinite cubic-bezier(0.77,0,0.175,1);
        }
        .loader::before { background-color: var(--text) }
        .loader::after { background-color: var(--blue); animation-delay: 0.5s; }
        @keyframes loader {
          0%, 100% {  left: 35px; }
          25% { transform: scale(.3);  }
          50% {  left: 0%; }
          75% {  transform: scale(1);  }
        }
        `}
      </style>
      <div className="loader"></div>
    </>
  )
}

export default Loader