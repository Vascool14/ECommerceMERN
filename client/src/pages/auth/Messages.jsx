import React, {useRef, useContext, useState, useEffect} from 'react'
import { MyContext } from '../../Context'
import '../Messages.css'
import { MONTHS } from '../../utils/Constants'

const Messages = () => {
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
    useEffect(() => {
        bottom.current.scrollIntoView({behavior:'smooth'});
    }, [])
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
    const inputFile = useRef(null);
    const [file, setFile] = useState(null);
    useEffect(() => {
        if(file){
            // turn file to base64
            console.log(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                // send base64 to server to upload to cloudinary
                console.log(reader.result);
            }
        }
    }, [file])

    function getMonthAndDate(date){
        let d = new Date(parseInt(date));
        return `${MONTHS[d.getMonth()]} ${d.getDate()}`
    }
    return (
    <main className="flex h-screen gap-2 w-screen p-0 max-w-[80rem] mx-auto">
        <section className='w-full flex flex-col items-center relative bg-[var(--bg)] h-full'>
            {/* messages */}
            <section id='messages' className='flex pb-2 relative px-2 items-center flex-col h-full w-full gap-[6px] overflow-y-scroll overflow-x-hidden'>
                {/* Mock messages */}
                <div ref={top}></div>                    
                <span className='time z-10 sticky top-2'>{getMonthAndDate(1684346810886)}</span>
                <div className='message leftMessage'>Hello!</div>
                <div className='message leftMessage'>You can talk to us here for more info regarding orders and other questions</div>
                <span className='time z-10 sticky top-2'>{MONTHS[5]} 7</span>
                    {fakeMessages.slice(0,messageCount).map((message, index) => (
                    <div key={index} className='w-full flex relative items-center'>
                        <div className={`message ${message.admin?'leftMessage':'rightMessage'}`}>{message.content}</div>
                        <span className={`time absolute ${message.admin?'rightTime':'leftTime'}`}>
                            {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                            {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                        </span>
                    </div>
                    ))}
                    <span className='time z-10 sticky top-2'>{MONTHS[5]} 17</span>
                    {fakeMessages.slice(0,messageCount).map((message, index) => (
                    <div key={index} className='w-full flex relative items-center'>
                        <div className={`message ${message.admin?'leftMessage':'rightMessage'}`}>{message.content}</div>
                        <span className={`time absolute ${message.admin?'rightTime':'leftTime'}`}>
                            {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                            {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                        </span>
                    </div>
                    ))}
                    <span className='time z-10 sticky top-2'>{MONTHS[7]} 23</span>
                    {fakeMessages.slice(0,messageCount).map((message, index) => (
                    <div key={index} className='w-full flex relative items-center'>
                        <div className={`message ${message.admin?'leftMessage':'rightMessage'}`}>{message.content}</div>
                        <span className={`time absolute ${message.admin?'rightTime':'leftTime'}`}>
                            {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                            {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                        </span>
                    </div>
                    ))}
                    <span className='time z-10 sticky top-2'>{MONTHS[6]} 1</span>
                    {fakeMessages.slice(0,messageCount).map((message, index) => (
                    <div key={index} className='w-full flex relative items-center'>
                        <div className={`message ${message.admin?'leftMessage':'rightMessage'}`}>{message.content}</div>
                        <span className={`time absolute ${message.admin?'rightTime':'leftTime'}`}>
                            {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                            {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                        </span>
                    </div>
                    ))}
                <div ref={bottom}></div>
            </section>
            {/* INPUT */}
            <form className='h-16 p-2 bg-[var(--gray)] w-full pr-0 sm:rounded-t-lg flex items-center' 
            onSubmit={(e)=>{e.preventDefault();sendMessage()}} 
            autoComplete='off'>
                <div className="h-full transition-all cursor-pointer bg-[var(--bg)] hover:scale-90 rounded-lg aspect-square flex items-center justify-center"
                onClick={()=>inputFile.current.click()}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--text)" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
                    <input type="file" className='hidden' ref={inputFile} onChange={(e)=>{setFile(e.target.files[0])}}/>
                </div>

                <input onClick={()=>bottom.current.scrollIntoView({behavior:'smooth'})} 
                type="text" 
                name="message" 
                autoCorrect="false"
                autoComplete="false"
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                className='h-full w-full mx-2 rounded-lg p-4 bg-[var(--bg)]' 
                placeholder='Type a message' 
                />

                <div onClick={()=>sendMessage()} className={`${newMessage.length == 0 && 'hidden'} h-full aspect-square flex bg-[var(--text)] hover:scale-90 transition-all mr-2 justify-center items-center rounded-lg cursor-pointer`}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={'var(--bg)'} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
                </div>
            </form>
        </section>
    </main>
    )
}

export default Messages