import React, { useState } from 'react'

function CheckoutButton() {
    const [ isDone , setIsDone ] = useState(false)
    return (
        <div className={`containerForButton hover:scale-[1.02] active:scale-[0.98] ${isDone ? 'done':''}`}
        onClick={() => setIsDone(true)}>
            <style>
                {`
                .containerForButton {
                    display: flex;
                    width: 100%;
                    height: 3.8rem;
                    position: relative;
                    border-radius: 1rem;
                    overflow: hidden;
                    // border: 1.5px solid var(--text);
                    transition: 0.3s ease-in-out;
                  }
                  .containerForButton.done .left-side {
                    width: 100%;
                  }
                  .left-side {
                    background-color: var(--gray);
                    width: 30%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: 0.3s;
                    flex-shrink: 0;
                    overflow: hidden;
                  }
                  
                  .right-side {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    cursor: pointer;
                    background-color: var(--bg);
                    justify-content: space-between;
                    white-space: nowrap;
                    transition: 0.3s;
                  }
                  
                  .arrow {
                    width: 20px;
                    height: 20px;
                    margin-right: 20px;
                  }
                  
                  .new {
                    font-size: 23px;
                    font-family: "Lexend Deca", sans-serif;
                    margin-left: 20px;
                  }
                  
                  .card {
                    width: 36px;
                    height: 24px;
                    background-color: var(--primary);
                    position: absolute;
                    display: flex;
                    z-index: 10;
                    flex-direction: column;
                    align-items: center;
                  }
                  
                  .card-line {
                    width: 100%;
                    height: 3px;
                    background-color: var(--text);
                    border-radius: 2px;
                    margin-top: 5px;
                  }
                  
                  @media only screen and (max-width: 480px) {
                    .containerForButton {
                      transform: scale(0.7);
                    }
                  
                    .containerForButton.done {
                      transform: scale(0.74);
                    }
                  
                    .new {
                      font-size: 18px;
                    }
                  }
                  
                  .buttons {
                    width: 8px;
                    height: 1.5px;
                    background-color: #379e1f;
                    box-shadow: 0 -3px 0 0 #26850e, 0 3px 0 0 #56be3e;
                    margin: 5px 0 0 -17px;
                  }
                  
                  .containerForButton.done .card {
                    animation: slide-top 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
                  }
                  
                  .containerForButton.done .post {
                    animation: slide-post 1s cubic-bezier(0.165, 0.84, 0.44, 1) both;
                  }
                  
                  @keyframes slide-top {
                    0% {
                      -webkit-transform: translateY(0);
                      transform: translateY(0);
                    }
                  
                    50% {
                      -webkit-transform: translateY(-70px) rotate(90deg);
                      transform: translateY(-70px) rotate(90deg);
                    }
                  
                    60% {
                      -webkit-transform: translateY(-70px) rotate(90deg);
                      transform: translateY(-70px) rotate(90deg);
                    }
                  
                    100% {
                      -webkit-transform: translateY(-8px) rotate(90deg);
                      transform: translateY(-8px) rotate(90deg);
                    }
                  }
                  
                  .post {
                    width: 50px;
                    height: 60px;
                    background-color: var(--text);
                    position: absolute;
                    z-index: 11;
                    bottom: 10px;
                    top: 110px;
                    border-radius: 6px;
                    overflow: hidden;
                  }
                  
                  .post-line {
                    width: 80%;
                    left: 10%;
                    height: 3px;
                    background-color: var(--bg);
                    position: absolute;
                    border-radius: 0px 0px 3px 3px;
                  }
                  
                  .screen {
                    width: 80%;
                    height: 20px;
                    background-color: black;
                    position: absolute;
                    top: 12px;
                    right: 10%;
                    border-radius: 3px;
                  }
                  
                  .numbers {
                    width: 12px;
                    height: 12px;
                    background-color: #838183;
                    box-shadow: 0 -18px 0 0 #838183, 0 18px 0 0 #838183;
                    border-radius: 2px;
                    position: absolute;
                    transform: rotate(90deg);
                    left: 25px;
                    top: 52px;
                  }
                  
                  .numbers-line2 {
                    width: 12px;
                    height: 12px;
                    background-color: #aaa9ab;
                    box-shadow: 0 -18px 0 0 #aaa9ab, 0 18px 0 0 #aaa9ab;
                    border-radius: 2px;
                    position: absolute;
                    transform: rotate(90deg);
                    left: 25px;
                    top: 68px;
                  }
                  
                  @keyframes slide-post {
                    50% {
                      -webkit-transform: translateY(0);
                      transform: translateY(0);
                    }
                  
                    100% {
                      -webkit-transform: translateY(-90px);
                      transform: translateY(-90px);
                    }
                  }
                  
                  .dollar {
                    position: absolute;
                    font-size: 16px;
                    font-family: "Lexend Deca", sans-serif;
                    width: 100%;
                    left: 0;
                    top: 0;
                    color: var(--primary);
                    text-align: center;
                  }
                  
                  .containerForButton.done .dollar {
                    animation: fade-in-fwd 0.3s 1s backwards;
                  }
                  
                  @keyframes fade-in-fwd {
                    0% {
                      opacity: 0;
                      transform: translateY(-5px);
                    }
                  
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}
            </style>
            <div className="left-side">
            <div className="card">
            <div className="card-line"></div>
            <div className="buttons"></div>
            </div>
            <div className="post">
            <div className="post-line"></div>
            <div className="screen">
                <div className="dollar">£</div>
            </div>
            <div className="numbers"></div>
            <div className="numbers-line2"></div>
            </div>
            </div>
            <div className="right-side"><div className="new">New Transaction</div></div>
        </div>
    )
}

export default CheckoutButton