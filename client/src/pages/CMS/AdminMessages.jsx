import React,{useContext, useEffect, useState, useRef} from 'react'
import { MyContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Messages.css'
import { MONTHS, COLORS } from '../../utils/Constants'
import { getMonthAndDate } from '../../utils/Functions'
import { getOnlineStatus } from '../../utils/Functions'

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
    {id:7, date: new Date().getTime(), admin:false, content:'Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio. alni'},
  ]);
  const [ targetedUser, setTargetedUser ] = useState({}); 
  const navigate = useNavigate();
  function changeUser(user) {
    setTargetedUser(user);
    setLastSeen(getOnlineStatus(user.lastActive));
    const section = document.getElementById('messages');
    section.scrollTop = section.scrollHeight;
  }
  function sendMessage() {
    if(newMessage.length>0){
      setFakeMessages([...fakeMessages, {date: new Date().getTime(), admin:true, content:newMessage}]);
      setNewMessage('');
      setTimeout(() => {
        bottom.current.scrollIntoView({behavior:'smooth'});
      }, 100);
    }
  }
  const inputFile = useRef(null);
  const [ file , setFile ] = useState(null);
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
    <div className="flex h-screen sm:px-[var(--sidePadding)] gap-2 w-screen overflow-hidden max-sm:pb-[calc(4.5rem+var(--newsHeight))] sm:pt-[calc(var(--navHeight)+var(--newsHeight))]">
      {/* users preview */}
      <section className='max-sm:absolute w-full sm:w-2/5 min-w-[18rem] gap-2 flex flex-col h-full overflow-scroll p-2 max-sm:pb-[calc(5.5rem+var(--newsHeight))]'>
          {/* Find by name */}
          <div className="h-12 relative flex items-center cursor-pointer">
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
            <div key={user._id} className="flex hover:scale-[0.96] transition-all items-center h-20 p-2 rounded-xl cursor-pointer"
            style={{backgroundColor: targetedUser._id === user._id ? 'var(--primary)' : 'var(--gray)'}}
            onClick={() => changeUser(user)}>
              <div className="h-full aspect-square">
                  {user.avatar?
                    <img className='h-full w-full rounded-lg' src={user.avatar} alt="avatar" />
                    :
                    <div className="h-full w-full rounded-lg flex items-center justify-center" 
                      style={{backgroundColor: COLORS[user.username.charCodeAt(0)%10]}}>
                    <h1 className='capitalize text-white'>{user.username.slice(0,1)}</h1>
                  </div>}
              </div>
              {user.mail && 
              <div className='flex flex-col p-2 overflow-scroll'>
                  <h3>{user.username}</h3>
                  <p>{user.mail}</p>
              </div>
              }
            </div>
          ))}
      </section>
      {/* CONVersation */}
      {targetedUser.username ?
      <section className='w-full overflow-hidden flex flex-col items-center relative bg-[var(--bg)]'>
        {/* targeted user */}
        <div className='flex w-full items-center z-10 mx-auto h-16 border border-t-0 border-[var(--gray)] p-2 cursor-pointer sm:rounded-b-xl'>
            {targetedUser.mail && 
            <button onClick={() => setTargetedUser({})} className='svgContainer h-6 w-6 ml-2 mr-4 sm:hidden'>
              <svg className="h-8 w-8 text-[var(--text)] hover:text-[var(--primary)] transition-all duration-300 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={'var(--text)'}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            </button>}
            <div className="h-full aspect-square">
            {targetedUser.avatar?
              <img className='h-full w-full rounded-lg' src={targetedUser.avatar} alt="avatar" />
              :
              <div className="h-full w-full rounded-lg flex items-center justify-center"
                style={{backgroundColor: COLORS[targetedUser.username.charCodeAt(0)%10]}}>
                <h2 className='capitalize text-white'>{targetedUser.username.slice(0,1)}</h2>
              </div>}

            </div>
            <span className='flex flex-col p-2 pl-4 overflow-scroll'>
              <h3>{targetedUser.username}</h3>
              <p className='-mt-1'>{lastSeen}</p>
            </span>
        </div>
        {/* messages */}
        <section id='messages' className='flex pb-2 relative px-2 items-center flex-col h-full w-full gap-[6px] overflow-y-scroll overflow-x-hidden'>
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
                    <span className='time z-10 sticky top-2'>{MONTHS[5]} 17</span>
                    {fakeMessages.map((message, index) => (
                    <div key={index} className='w-full flex relative items-center'>
                        <div className={`message ${message.admin?'rightMessage':'leftMessage'}`}>{message.content}</div>
                        <span className={`time absolute ${message.admin?'leftTime':'rightTime'}`}>
                            {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                            {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                        </span>
                    </div>
                    ))}
                <div ref={bottom}></div>
        </section>
        {/* INPUT */}
        <form className='h-16 border-t border-[var(--bg)] p-2 bg-[var(--gray)] w-full pr-0 sm:rounded-t-lg flex items-center' 
            onSubmit={(e)=>{e.preventDefault();sendMessage()}} 
            autoComplete='off'>
                <div className="h-full transition-all cursor-pointer bg-[var(--bg)] hover:scale-90 rounded-lg aspect-square flex items-center justify-center"
                onClick={()=>inputFile.current.click()}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--text)" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
                    <input ref={inputFile} type="file" className='hidden' onChange={(e)=>{setFile(e.target.files[0])}}/>
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
      :
      <section className='max-sm:hidden w-full flex items-center justify-center h-full flex-col relative bg-[var(--bg)]'>
        <h2>Pick one conversation</h2>
      </section>
      }
    </div>
  )
}

export default AdminMessages