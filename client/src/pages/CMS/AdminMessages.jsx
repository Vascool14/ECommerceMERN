import React,{useContext, useEffect, useState} from 'react'
import { MyContext } from '../../Context'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './Messages.css'
import { MONTHS, COLORS } from '../../utils/Constants'

const AdminMessages = () => {
  const {state, setState} = useContext(MyContext)
  const { users } = state;
  const [ localUsers, setLocalUsers ] = useState([]);
  
  const [ targetedUser, setTargetedUser ] = useState({}); 
  const navigate = useNavigate();

  // on reload navigate to '/account'
  window.onbeforeunload = () => navigate('/account');

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
  const fakeMessages = [
    {id:1, date: 1684346810886 ,sender:'admin', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:2, date: 1684346810886, sender:'user',  content:'Lbore ulequi possimus iste voluptates dolore optio.'},
    {id:3, date: 1684346810886, sender:'admin', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:4, date: 1684116810886, sender:'user',  content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:5, date: 1684116810886, sender:'user',  content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:6, date: new Date().getTime(), sender:'admin', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:7, date: new Date().getTime(), sender:'admin', content:'Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio. alni'},
    {id:9, date: new Date().getTime(), sender:'user', content:'.'},
    {id:10, date: new Date().getTime(), sender:'user', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:11, date: new Date().getTime(), sender:'admin', content:'Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:12, date: new Date().getTime() ,sender:'admin', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:22, date: new Date().getTime(), sender:'user',  content:'Lbore ulequi possimus iste voluptates dolore optio.'},
    {id:32, date: new Date().getTime(), sender:'admin', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:42, date: new Date().getTime(), sender:'user',  content:'Loreelit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:52, date: new Date().getTime(), sender:'user',  content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:62, date: new Date().getTime(), sender:'admin', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:72, date: new Date().getTime(), sender:'admin', content:'Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio. alni'},
    {id:92, date: new Date().getTime(), sender:'user', content:'Lste voluptates dolore optio.'},
    {id:120, date: new Date().getTime(), sender:'user', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:121, date: new Date().getTime(), sender:'admin', content:'Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
  ];
  const section = document.getElementById('messages');
  function changeUser(user) {
    setTargetedUser(user);
    section.scrollTop = section.scrollHeight;
  }
  function turnDate(d) {
    d = new Date(d);
    if(new Date().getTime() - d < 86400000) return `today ${(d.getHours()>9?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())}`;
    return `${d.getDate()+' '+MONTHS[d.getMonth()]+' '+(d.getHours()>9?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())}`;
  }
  function getOnlineStatus(d) {
    return (new Date().getTime()-d<60000)?`last seen ${turnDate(d)}`:'active now';
  }

  const [ onlineState, setOnlineState ] = useState(getOnlineStatus(targetedUser.lastSeen));
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('getOnlineStatus(targetedUser.lastSeen)');
      setOnlineState(getOnlineStatus(targetedUser.lastSeen));
    }, 30000);
    return () => clearTimeout(timeout); 
  }, [])
  return (
    <div className="flex h-screen sm:px-[var(--sidePadding)] gap-2 w-screen overflow-hidden p-0 max-sm:pb-[calc(4.5rem+var(--newsHeight))] sm:pt-[calc(var(--navHeight)+var(--newsHeight))]">
      {/* users preview */}
      <section className='max-sm:absolute w-full sm:w-2/5 min-w-[18rem] gap-2 flex flex-col h-full overflow-scroll p-2'>
          {localUsers.length > 0 && localUsers.reverse().map((user) => (
            <div key={user._id} className="flex items-center h-20 p-2 rounded-xl cursor-pointer"
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
        <div className='flex w-full items-center z-10 mx-auto h-16 sm:bg-[var(--secondBg)] border-b border-[var(--gray)] p-2 cursor-pointer sm:rounded-b-xl'>
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
              <p className='-mt-1'>{onlineState}</p>
            </span>
        </div>
        {/* messages */}
        <section id='messages' className='flex py-2 relative px-2 items-center flex-col h-full w-full gap-2 overflow-y-scroll overflow-x-hidden'>
            {/* Mock messages */}
            <span className='time'>{MONTHS[5]} 7</span>
            {[...fakeMessages].reverse().map((message) => (
              <div className='w-full flex relative items-center'>
                <div key={message.id} className={`message ${message.sender==='admin'?'leftMessage':'rightMessage'}`}>{message.content}</div>
                <span className={`time absolute ${message.sender==='admin'?'rightTime':'leftTime'}`}>
                    {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                    {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                </span>
              </div>
            ))}
        </section>
        {/* INPUT */}
        <header className='h-16 p-2 bg-[var(--gray)] w-full pr-0 sm:rounded-t-lg flex gap-2 items-center'>
          {/* <h1>O</h1> */}
          <input onClick={()=>bottom.current.scrollIntoView({behavior:'smooth'})} 
            type="text" 
            name="message" 
            autoCorrect="false"
            className='h-full w-full rounded-lg p-4 bg-[var(--bg)] mr-auto' 
            placeholder='Type a message' />
          <div className="h-full flex px-4 bg-[var(--primary)] transition-all mr-2 items-center text-center rounded-lg cursor-pointer">Send</div>
        </header>
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