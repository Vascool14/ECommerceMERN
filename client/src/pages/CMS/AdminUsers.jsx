import React, { useContext,useEffect} from 'react'
import { MyContext } from '../../Context'
import { useNavigate } from 'react-router-dom'

const AdminUsers = () => {
    const { state, setState } = useContext(MyContext);
    const { users } = state;
    const navigate = useNavigate();
    useEffect(() => {
        if(state.user.role !== 'admin') navigate('/');
        if(!users&& state.user.role === 'admin') navigate('/admin');
    }, [])
    return (
    <main className='p-4'>
        <div className='mx-auto flex items-end justify-center gap-2'>
            <h1 className='ml-8'>All Users</h1>
            <p className='mb-4'>(Newest First)</p>
        </div>
        <section className='w-full grid md:grid-cols-2 xl:grid-cols-3 gap-2'>
            {users && [...users.list].reverse().map((user) => (
                <div key={user._id} className='flex items-center h-24 bg-[var(--secondBg)] p-2 rounded-xl'>
                    <div className="h-full aspect-square">
                        {user.avatar?
                        <img className='h-full w-full rounded-lg object-cover' src={user.avatar} alt="avatar" />
                        :
                        <div className="h-full w-full rounded-lg flex items-center justify-center bg-[var(--blue)]">
                            <h1 className='capitalize text-white'>{user.username.slice(0,1)}</h1>
                        </div>}
                    </div>
                    
                    <div className='flex flex-col p-2 overflow-scroll'>
                        <h2>{user.username}</h2>
                        <p>{user.mail}</p>
                    </div>
                </div>
            ))}
        </section>
    </main>
  )
}

export default AdminUsers