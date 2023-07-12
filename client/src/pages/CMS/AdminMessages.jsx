import React,{useContext, useEffect, useState, useRef} from 'react'
import { MyContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Messages.css'
import { MONTHS } from '../../utils/Constants'
import { getOnlineStatus } from '../../utils/Functions'
import { hoursAndMinutes } from '../../utils/Functions'

const AdminMessages = () => {
  const {state, setState} = useContext(MyContext);
  const { users } = state;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) return navigate('/login');
    if(users.length>0) return setLocalUsers(users);   // get all users if not already done
    else setLocalUsers(users)
    axios.get('/users/me', {headers: {Authorization:`Bearer ${token}`}})
    .then(res => {
        setState({...state, user: res.data})
        if(res.data.role!=='admin')  return navigate('/account'); 
    })
    .then(
      axios.get('/admin/users', {header: {Authorization:`Bearer ${token}`}})
      .then(res => {
          setState({
          ...state, 
          users: [...res.data.users],
          toast:{text:res.data.message, success:true} });

          setLocalUsers(res.data.users);
      })
      .catch(err => {
          setState({...state, toast:{text:err.response.data.error, success:false}});
          navigate('/account')
      })
    )
  }, [])
  const [ localUsers, setLocalUsers ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');
  const bottom = useRef(null);
  const top = useRef(null);
  const findUser = useRef(null);
  const [ userFilter, setUserFilter ] = useState('');
  const [ fakeMessages, setFakeMessages ] = useState([
    {id:1, date: 1684346810886 ,admin:false, content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:2, date: 1684346810886, admin:true,  content:'Lbore ulequi possimus iste voluptates dolore optio.'},
    {id:3, date: 1684346810886, admin:false, content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:4, date: 1684116810886, admin:true,  content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:5, date: 1684116810886, admin:true,  content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:6, date: new Date().getTime(), admin:false, content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:7, date: new Date().getTime(), admin:false, content:'abore ulequi possimus  optio. alni'},
  ]);
  const [ targetedUser, setTargetedUser ] = useState({}); 
  const navigate = useNavigate();
  function changeUser(user) {
    setTargetedUser(user);
    setLastSeen(getOnlineStatus(user.lastActive));
    bottom.current?.scrollIntoView();
  }
  function sendMessage() {
    if(newMessage.length>0){
      setFakeMessages([...fakeMessages, {date: new Date().getTime(), admin:true, content:newMessage}]);
      setNewMessage('');
      setTimeout(() => {
        bottom.current?.scrollIntoView();
      }, 100);
    }
  }
  const [ lastSeen , setLastSeen ] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSeen(getOnlineStatus(targetedUser.lastActive));
      axios.get('/admin/user', {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}, params:{id:targetedUser._id}})
      .then(res => {
        if(res.data!==targetedUser) setTargetedUser({...targetedUser, lastActive: res.data})
      })
    }, 20000);
    return () => clearInterval(interval);
  }, [targetedUser])
  return (
    <div className="flex h-screen md:px-[var(--sidePadding)] gap-2 w-screen overflow-hidden max-sm:pb-[calc(var(--navHeight)+var(--newsHeight))] sm:pt-[calc(var(--navHeight)+var(--newsHeight))]">
      {/* users preview */}
      <section className='max-sm:absolute w-full sm:w-1/2 min-w-[18rem] gap-2 flex flex-col h-full overflow-scroll p-2 max-sm:pb-[calc(5.5rem+var(--newsHeight))]'>
          {/* Find by name */}
          <div className="h-12 flex relative items-center cursor-pointer">
            <svg onClick={() => findUser.current.focus()} 
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 absolute ml-3 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            <input 
              ref={findUser} type="text" 
              placeholder='Find user by name' 
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className='w-full bg-[var(--gray)] h-full p-2 py-4 pl-12 text-lg rounded-xl' />
          </div>
          {localUsers.length > 0 && localUsers.filter(user => user.username.toLowerCase().includes(userFilter.toLowerCase())).sort((a,b) => b.lastActive - a.lastActive).map(user => (
            <div key={user._id} className="flex hover:scale-[0.96] transition-all items-center h-16 p-2 rounded-xl cursor-pointer"
            style={{backgroundColor: targetedUser._id === user._id ? '#888' : 'var(--gray)'}}
            onClick={() => changeUser(user)}>
              <div className="h-full relative aspect-square rounded-lg bg-[var(--secondBg)] centerAll">
                <h2 className='capitalize'>{user.username.slice(0,1)}</h2>
                {/* new message */}
                {user.newMessage && <span className='absolute -top-1 -right-1 w-5 h-5 
                centerAll 
                rounded-full bg-[var(--primary)]'></span>}
              </div>
              {user.mail && 
              <div className='flex flex-col p-2 overflow-hidden'>
                  <h3>{user.username}</h3>
                  {/* last message */}
                  <span className={`-mt-2 ${user.newMessage && 'font-bold'}`} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                  >{fakeMessages[fakeMessages.length-1].content}</span>
              </div>
              }
            </div>
          ))}
      </section>
      {/* CONVersation */}
      {targetedUser.username ?  
      <section className='w-full overflow-hidden flex flex-col items-center relative bg-[var(--bg)]'>
        {/* targeted user */}
        <div className='flex w-full items-center z-10 mx-auto h-16 border border-t-0 p-2 cursor-pointer sm:rounded-b-xl'>
            {targetedUser.mail && 
            <button onClick={() => setTargetedUser({})} className='svgContainer h-6 w-6 ml-2 mr-4 sm:hidden'>
              <svg className="h-8 w-8 text-[var(--text)] hover:text-[var(--primary)] transition-all duration-300 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={'var(--text)'}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            </button>}
            <div className="h-full aspect-square rounded-lg bg-[#888] centerAll">
                <h1 className='capitalize text-white'>{targetedUser.username.slice(0,1)}</h1>
            </div>
            <span className='flex flex-col p-2 pl-3 overflow-scroll'>
              <h3>{targetedUser.username}</h3>
              <p className='-mt-2'>{lastSeen}</p>
            </span>
        </div>
        {/* messages */}
        <section id='messages' 
        className='flex pb-2 relative px-2 items-center flex-col h-full w-full gap-[6px] overflow-y-scroll overflow-x-hidden'>
                {/* Mock messages */}
                <div ref={top}></div>                    
                <span className='time z-10 sticky top-[6px]'>{MONTHS[5]} 7</span>
                    {fakeMessages.map((message, index) => (
                    <div key={index} className='w-full flex relative items-center'>
                        <div className={`message ${message.admin?'rightMessage':'leftMessage'}`}>{message.content}</div>
                        <span className={`time absolute ${message.admin?'leftTime':'rightTime'}`}>
                            {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                            {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                        </span>
                    </div>
                    ))}
                    {!targetedUser.messages?.length > 0 &&  // change the bang after testing
                    fakeMessages[fakeMessages.length-1].admin &&
                    (targetedUser.messages?.seen ?
                    <span className='ml-auto mr-2 text-xs'>message seen</span>:
                    <span className='ml-auto mr-2 text-xs'>
                    Sent at {hoursAndMinutes(fakeMessages[fakeMessages.length-1].date)}</span>
                    )}
                <div ref={bottom}></div>
        </section>

        {/* INPUT */}
        <div className='bg-[var(--bg)] w-full sm:rounded-t-lg h-20 border-t 
            border-[var(--bg)] sticky bottom-0 z-10 overflow-hidden'>
            <form className='p-2 bg-[var(--gray)] h-full w-full pr-0 centerAll' 
            onSubmit={(e)=>{e.preventDefault();sendMessage()}} 
            autoComplete='off'>
            <input onClick={()=>bottom.current.scrollIntoView({behavior:'smooth'})} 
                type="text" 
                name="message" 
                autoCorrect="false"
                autoComplete="off"
                autoCapitalize="sentences"
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                className='h-full w-full mr-2 rounded-lg p-4 bg-[var(--bg)]' 
                placeholder='Type a message' 
            />
            <div onClick={()=>sendMessage()} className={`${newMessage.length == 0 && 'hidden'} h-full aspect-square flex bg-[var(--text)] hover:scale-90 transition-all mr-2 justify-center items-center rounded-lg cursor-pointer`}>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={'var(--bg)'} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
            </div>
          </form>
        </div>
      </section>
      :
      <section className='max-sm:hidden w-full centerAll h-full flex-col relative bg-[var(--bg)]'>
        <h2>Pick one conversation</h2>
      </section>
      }
    </div>
  )
}

export default AdminMessages