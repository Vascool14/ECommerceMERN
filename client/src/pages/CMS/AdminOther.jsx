import React, { useContext, useEffect, useState} from 'react'
import { MyContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminOther = () => {
    const { state, setState } = useContext(MyContext);
    const { news } = state;
    const navigate = useNavigate();
    const [ newsList, setNewsList ] = useState([]);
    useEffect(() => {
        if(!localStorage.getItem('token')) navigate('/login');
        if(state.user.role === 'admin') return;
        axios.get('/users/me', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => { 
          setState({...state, user: res.data});
          if(res.data.role !== 'admin') navigate('/account');
        })
    }, [])
    useEffect(() => {
        if(news== newsList) return;
        setNewsList(news);
    }, [news])
    const handleNewsChange = (e, index) => {
        const newList = [...newsList];
        newList[index] = e.target.value;
        setNewsList(newList);
    }
    const Delete = (index) => {
        const newList = [...newsList];
        newList.splice(index, 1);
        setNewsList(newList);
    }
    const [ newPromo, setNewPromo ] = useState('');
    const Add = () => {
        const newList = [...newsList];
        newList.push(newPromo);
        setNewsList(newList);
        setNewPromo('');
    }
    const Save = () => {
        setState({...state, news:newsList, toast:{text:'The Promos are saved!', success:true}});
        axios.put('/admin/news', newsList, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }   
    return (
    <main>
        <section className=" flex flex-col w-full h-full">
            <div className='mx-auto flex items-end justify-center gap-2'>
                <h1 className='ml-8'>News</h1>
                <p className='mb-3'>(under 45 characters)</p>
            </div>
            <div className="flex flex-col w-full gap-2">
                {newsList.length > 0 && newsList.map((item, index) => {
                    return (
                    <div key={index} className="flex rounded-md overflow-hidden relative w-full h-12">
                        <input type="text" value={item} onChange={(e)=>handleNewsChange(e, index)} placeholder='Promotional News' maxLength={46}
                        className='p-2 sm:px-4 w-full h-full overflow-scroll max-sm:text-sm bg-[var(--secondBg)]' />
                        <div className="h-full bg-red-500 w-20 flex justify-center items-center cursor-pointer" onClick={() => Delete(index)}>Delete</div>
                    </div>    
                )})}
                {newsList.length < 6 && 
                <div className="flex rounded-md overflow-hidden relative w-full h-12">
                    <input type="text" placeholder='Promotional News' value={newPromo} onChange={e=>setNewPromo(e.target.value)} maxLength={46}
                    className='p-2 sm:px-4 w-full h-full overflow-scroll max-sm:text-sm bg-[var(--secondBg)]' />
                    <div className="h-full w-20 bg-[var(--primary)] flex justify-center items-center cursor-pointer" onClick={()=>Add()}>Add</div>
                </div>}
                {// check if there are changes to save
                (newsList.length !== news.length || newsList.some((item, index) => item !== news[index])) &&
                <div className="h-12 cursor-pointer w-full rounded-md centerAll bg-green-500" onClick={()=>Save()}>Save</div>}
            </div>
        </section>
    </main>
  )
}

export default AdminOther