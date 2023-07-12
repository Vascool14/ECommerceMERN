import React, {useRef, useContext, useState, useEffect} from 'react'
import { MyContext } from '../../Context'
import '../Messages.css'
import { MONTHS } from '../../utils/Constants'
import { getMonthAndDate } from '../../utils/Functions'
import { Link } from 'react-router-dom'
import { hoursAndMinutes } from '../../utils/Functions'

const Messages = () => {
    const { state, setState } = useContext(MyContext);
    const { user } = state;
    const [ fakeMessages, setFakeMessages ] = useState([
        {date: 1684346810886 ,admin:false, content:'Hello, how are you?'},
        {date: 1684346810886, admin:false, content:'Lbore ulequi possimus iste voluptates dolore optio.'},
        {date: 1684346810886, admin:true, content:'Good, and you?'},
        {date: 1684116810886, admin:false, content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
        {date: 1684116810886, admin:true,  content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
        {date: new Date().getTime(), admin:false, content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
        {date: new Date().getTime(), admin:false, content:'Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio. alni'},
        {date: new Date().getTime(), admin:false, content:'Bye!!!'},
    ]);
    const bottom = useRef(null);
    const top = useRef(null);
    // useEffect(() => {
    //     bottom && bottom.current.scrollIntoView({behavior:'smooth'});
    // }, [])
    const [messageCount, setMessageCount] = useState(100);
    const [newMessage, setNewMessage] = useState('');
    const sendMessage = () => {
        if(newMessage.length>0){
            setFakeMessages([ 
                ...fakeMessages,
                {id:fakeMessages.length, 
                date: new Date().getTime(), 
                admin:false, 
                content:newMessage}
            ]);
            setNewMessage('');
            setTimeout(() => {
                bottom.current.scrollIntoView({behavior:'smooth'});
            }, 100);
        }
    }
    return (
    <div className="flex sm:px-[var(--sidePadding)] h-screen gap-2 w-screen p-0 
    max-sm:pb-[calc(var(--navHeight)+var(--newsHeight))] max-w-[70rem] 
    mx-auto sm:pt-[calc(var(--navHeight)+var(--newsHeight))]">
        <section className='w-full flex flex-col items-center relative bg-[var(--bg)] h-full'>
            {!localStorage.getItem('token') ? 
            <div id='messages' className='flex p-2 relative items-center flex-col h-full w-full gap-[6px] overflow-y-scroll overflow-x-hidden'>
                <div className='message leftMessage'>Hello there!</div>
                <div className='message leftMessage'>You need to <Link className='underline' to="/login">log in</Link> or <Link className='underline' to="/register">register</Link> in order to message us.
                </div>
            </div>
            :
            <section id='messages' 
            className='flex pb-2 relative px-2 items-center flex-col w-full gap-[6px] 
            overflow-y-scroll overflow-x-hidden'>
                {/* messages */}
                <div ref={top}></div>
                <span className='time z-10 sticky top-2'>{getMonthAndDate(1684346810886)}</span>
                <div className='message leftMessage'>Hello there!</div>
                <div className='message leftMessage'>You can talk to us here for more info regarding orders and other questions</div>
                <span className='time z-10 sticky top-2'>{MONTHS[5]} 7</span>
                    {fakeMessages.slice(0,messageCount).map((message, index) => (
                    <div key={index} className='w-full flex relative items-center'>
                        <div className={`message ${message.admin?'leftMessage':'rightMessage'}`}>{message.content}</div>
                        <span className={`time absolute ${message.admin?'rightTime':'leftTime'}`}>
                            {hoursAndMinutes(message.date)}
                        </span>
                    </div>
                    ))}
                    {!user.messages?.length > 0 && 
                    !fakeMessages[fakeMessages.length-1].admin &&
                    (user.messages?.seen ?
                    <span className='ml-auto mr-2 text-xs'>message seen</span>:
                    <span className='ml-auto mr-2 text-xs'>
                    Sent at {hoursAndMinutes(fakeMessages[fakeMessages.length-1].date)}</span>
                    )}
                <div ref={bottom}></div>
            </section>}

            {/* INPUT */}
            {localStorage.getItem('token') && 
            <div className='bg-[var(--bg)] w-full sm:rounded-t-lg min-h-[4rem] border-t 
            border-[var(--bg)] sticky bottom-0 z-10 overflow-hidden'>
                <form className='p-2 bg-[var(--gray)] h-full w-full pr-0 centerAll' 
                onSubmit={(e)=>{e.preventDefault();sendMessage()}} 
                autoComplete='off'>

                    <input onClick={()=>bottom.current.scrollIntoView({behavior:'smooth'})} 
                    type="text" 
                    name="message" 
                    autoCorrect="false"
                    autoComplete="off"
                    value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}
                    className='h-full w-full mr-2 rounded-lg p-4 bg-[var(--bg)]' 
                    placeholder='Type a message' 
                    />

                    <div onClick={()=>sendMessage()} className={`${newMessage.length == 0 && 'hidden'} h-full aspect-square flex bg-[var(--text)] hover:scale-90 transition-all mr-2 justify-center items-center rounded-lg cursor-pointer`}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={'var(--bg)'} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
                    </div>
                </form>
            </div>}
        </section>
    </div>
    )
}

export default Messages