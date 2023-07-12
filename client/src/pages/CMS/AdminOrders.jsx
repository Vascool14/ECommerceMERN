import React, {useContext, useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MyContext } from '../../Context'
import axios from 'axios'
import { MONTHS } from '../../utils/Constants'

const AdminOrders = () => {
    const { state, setState } = useContext(MyContext);
    const { users, products, orders } = state;
    const navigate = useNavigate();
    
    const fakeOrders = [ 
      { orderDate: '1583758406487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1663753806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1483754806487', username: 'Deiu',mail:'andrei.vascul@lucaciu.ro', totalAmount: '180', status: 'Delivered' },
      { orderDate: '1633758506487', username: 'Nana', mail:'ioanamadaras2000@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758906487', username: 'NeneaIon', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683708806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1687228806487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683758806487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683748806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683755806487', username: 'Deiu',mail:'andrei.vascul@lucaciu.ro', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683758876487', username: 'Nana', mail:'ioanamadaras2000@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758606487', username: 'NeneaIon', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1683756806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683778806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683798806487', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1683158806487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683258806487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683728806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683723806487', username: 'Deiu',mail:'andrei.vascul@lucaciu.ro', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683128806487', username: 'Nana', mail:'ioanamadaras2000@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1682758806487', username: 'NeneaIon', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1682757806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683458806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683758406487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683753806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683754806487', username: 'Deiu',mail:'andrei.vascul@lucaciu.ro', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683758506487', username: 'Nana', mail:'ioanamadaras2000@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758906487', username: 'NeneaIon', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683708806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1687228806487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683418826487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683741802487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1641752806487', username: 'Deiu',mail:'andrei.vascul@lucaciu.ro', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Nana', mail:'ioanamadaras2000@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758416427', username: 'NeneaIon', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1684156206487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683741802487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683798416427', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1684158206487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683418826487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683741802487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683723806487', username: 'Deiu',mail:'andrei.vascul@lucaciu.ro', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Nana', mail:'ioanamadaras2000@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1682758841482', username: 'NeneaIon', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1684157206487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683454106287', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683741802487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683723806487', username: 'Deiu',mail:'andrei.vascul@lucaciu.ro', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Nana', mail:'ioanamadaras2000@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1682758841482', username: 'NeneaIon', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1684157206487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683454106287', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' }
    ];
    const [ isVisible , setIsVisible ] = useState(false);
    useEffect(() => {
          if(!localStorage.getItem('token') || state.user.role !== 'admin') navigate('/login');
          else setIsVisible(true);
          // axios.get('/admin/orders', {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}})
          // .then(res => {
            setState({ ...state, orders: [...fakeOrders]})
          //})
          // .catch(err => {
          //   setState({...state, toast:{text:err.response.data.message, success:false}});
          //   navigate('/login')
          // })
    }, [])
    const [filter, setFilter] = useState('');
    const [dateFilter, setDateFilter ] = useState('Newest');
    return (
    <main>
      {isVisible &&  
          <section className='flex mx-auto max-w-[50rem] flex-col h-auto border  rounded-xl'>
            <header className='w-full flex gap-3 justify-between items-center text-[var(--bg)] p-2 bg-[var(--primary)] font-semibold rounded-t-xl'>
              <div className='w-[5.3rem] p-1'>
                  <select name='status' id='status' className='bg-[var(--primary)] cursor-pointer '>
                      <option onClick={()=>setDateFilter('Newest')}>Newest</option>
                      <option onClick={()=>setDateFilter('Oldest')}>Oldest</option>
                  </select>
              </div>
              <div className='max-w-[5.8rem] ml-4 p-1'>
                <select name='status' id='status' className='bg-[var(--primary)] cursor-pointer max-w-[5.8rem]'>
                      <option onClick={()=>setFilter('')}>All</option>
                      <option onClick={()=>setFilter('Shipping')}>Shipping</option>
                      <option onClick={()=>setFilter('Delivered')}>Delivered</option>
                      <option onClick={()=>setFilter('Cancelled')}>Cancelled</option>
                  </select>
              </div>
            </header>
              {/* Orders */}
              {orders.length > 0 && orders.filter(order => order.status.includes(filter)).sort((a,b)=>dateFilter==='Newest'?b.orderDate-a.orderDate:a.orderDate-b.orderDate).map((order, index) => (
                <div key={index} className={`w-full flex justify-between items-center gap-3 sm:px-2 p-[3px] hover:bg-[var(--gray)] ${index%2==1&&'bg-[#8881]'}`}>
                  <div className='w-[4rem] sm:w-[5.3rem]'>
                    {new Date(parseInt(order.orderDate)).getDate()}&nbsp;
                    {MONTHS[new Date(parseInt(order.orderDate)).getMonth()]}&nbsp;
                    <span className="max-sm:hidden">{(new Date(parseInt(order.orderDate)).getFullYear())%100}'</span>
                  </div>
                  <div className="mr-auto p-1 overflow-scroll centerAll gap-3 sm:gap-4">
                    {order.username}
                    <span  className='max-md:hidden hover:underline cursor-pointer text-[#888]'
                    onClick={(e) => {e.preventDefault(); window.open(`mailto:${order.mail}?subject=Order%20Update&body=Good%20morning/afternoon/evening,%20your%20order%20has%20been%20....`, '_blank'); }}>({order.mail})</span>
                  </div>
                  <div className='w-[8.6rem] p-1'>
                    {order.status === 'Delivered' && <span className='flex gap-1 justify-between'><span>&pound;{order.totalAmount}</span><span>Delivered</span></span>}
                    {order.status === 'Cancelled' && <span className='text-[#c00] gap-1 flex justify-between'><span>&pound;{order.totalAmount}</span><span>Cancelled</span></span>}
                    {order.status === 'Shipping' && <span className='text-[var(--primary)] gap-1 flex justify-between'><span>&pound;{order.totalAmount}</span><span>Shipping</span></span>}
                  </div>
                </div>
              ))}
          </section>}
    </main>
  )
}

export default AdminOrders