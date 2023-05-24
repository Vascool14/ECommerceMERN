import React,{useContext, useEffect, useState, useRef} from 'react'
import { MyContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Messages.css'
import { MONTHS, COLORS } from '../../utils/Constants'

const AdminMessages = () => {
  const {state, setState} = useContext(MyContext);
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
  const { users } = state;
  const [ localUsers, setLocalUsers ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');
  const bottom = useRef(null);
  const top = useRef(null);
  const [ fakeMessages, setFakeMessages ] = useState([
    {id:1, date: 1684346810886 ,admin:false, content:'20 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:2, date: 1684346810886, admin:true,  content:'19 Lbore ulequi possimus iste voluptates dolore optio.'},
    {id:3, date: 1684346810886, admin:false, content:'18 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:4, date: 1684116810886, admin:true,  content:'17 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:5, date: 1684116810886, admin:true,  content:'16 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:6, date: new Date().getTime(), admin:false, content:'15 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:7, date: new Date().getTime(), admin:false, content:'14 Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio. alni'},
    {id:9, date: new Date().getTime(), admin:true, content:'13.'},
    {id:10, date: new Date().getTime(), admin:true, content:'12 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:11, date: new Date().getTime(), admin:false, content:'11 Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:12, date: new Date().getTime() ,admin:false, content:'10Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:22, date: new Date().getTime(), admin:true,  content:'9 Lbore ulequi possimus iste voluptates dolore optio.'},
    {id:32, date: new Date().getTime(), admin:false, content:'8 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:42, date: new Date().getTime(), admin:true,  content:'7 Loreelit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:52, date: new Date().getTime(), admin:true,  content:'6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:62, date: new Date().getTime(), admin:false, content:'5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:72, date: new Date().getTime(), admin:false, content:'4 Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio. alni'},
    {id:92, date: new Date().getTime(), admin:true, content:'3 Lste voluptates dolore optio.'},
    {id:120, date: new Date().getTime(), admin:true, content:'2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
    {id:121, date: new Date().getTime(), admin:false, content:'1 Autem dicta vero pariatur ab labore ulequi possimus iste voluptates dolore optio.'},
  ]);
  const [ targetedUser, setTargetedUser ] = useState({}); 
  const navigate = useNavigate();
  function changeUser(user) {
    setTargetedUser(user);
    const section = document.getElementById('messages');
    section.scrollTop = section.scrollHeight;
  }
  function turnDate(d) {
    d = new Date(d);
    if(new Date().getTime() - d < 86400000) return `today ${(d.getHours()>9?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())}`;
    return `${d.getDate()+' '+MONTHS[d.getMonth()]+' '+(d.getHours()>9?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())}`;
  }
  function getOnlineStatus(d) {
    d = new Date(d).getTime()
    return (new Date().getTime()-d<60000)?`last seen ${turnDate(d)}`:'active now';
  }
  const [ onlineState, setOnlineState ] = useState(getOnlineStatus(targetedUser.lastActive));
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOnlineState(getOnlineStatus(targetedUser.lastActive));
    }, 3000);
    return () => clearTimeout(timeout); 
  }, [])
  function sendMessage() {
    if(newMessage.length>0){
      setFakeMessages([...fakeMessages, {id:Math.random(), date: new Date().getTime(), sender:'admin', content:newMessage}]);
      setNewMessage('');
      setTimeout(() => {
        bottom.current.scrollIntoView({behavior:'smooth'});
      }, 100);
    }
  }
  return (
    <div className="flex h-screen sm:px-[var(--sidePadding)] gap-2 w-screen overflow-hidden p-0 max-sm:pb-[calc(4.5rem+var(--newsHeight))] sm:pt-[calc(var(--navHeight)+var(--newsHeight))]">
      {/* users preview */}
      <section className='max-sm:absolute w-full sm:w-2/5 min-w-[18rem] gap-2 flex flex-col h-full overflow-scroll p-2'>
          {localUsers.length > 0 && localUsers.sort((a,b) => b.lastActive - a.lastActive).map(user => (
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
            {fakeMessages.reverse().slice(0,10).map((message, index) => (
              <div key={index} className='w-full flex relative items-center'>
                <div className={`message ${message.sender==='admin'?'leftMessage':'rightMessage'}`}>{message.content}</div>
                <span className={`time absolute ${message.sender==='admin'?'rightTime':'leftTime'}`}>
                    {new Date(parseInt(message.date)).getHours()>9?new Date(parseInt(message.date)).getHours():('0'+new Date(parseInt(message.date)).getHours())}:
                    {new Date(parseInt(message.date)).getMinutes()>9?new Date(parseInt(message.date)).getMinutes():('0'+new Date(parseInt(message.date)).getMinutes())}
                </span>
              </div>
            ))}
        </section>
        {/* INPUT */}
        <form className='h-16 p-2 bg-[var(--gray)] w-full pr-0 sm:rounded-t-lg flex gap-2 items-center' 
        onSubmit={(e)=>{e.preventDefault();sendMessage()}}
        autoComplete='off'>
                <input onClick={()=>bottom.current.scrollIntoView({behavior:'smooth'})} 
                type="text" 
                name="message" 
                autoCorrect="false"
                autoComplete="false"
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                className='h-full w-full rounded-lg p-4 bg-[var(--bg)] mr-auto' 
                placeholder='Type a message' 
                />
                <div onClick={()=>sendMessage()} className="h-full aspect-square flex bg-[var(--text)] hover:bg-[var(--gray)] transition-all mr-2 justify-center items-center rounded-lg cursor-pointer">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--bg)'} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
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