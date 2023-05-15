import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../Context'
import axios from 'axios'

const AdminOrders = () => {
    const { state, setState } = useContext(MyContext);
    const { users, products } = state;
    const navigate = useNavigate();
    
    const orders = [ 
      { orderDate: '1583758406487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1663753806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1483754806487', username: 'Deiu',mail:'andreivascul2004@gmail.com', totalAmount: '180', status: 'Delivered' },
      { orderDate: '1633758506487', username: 'Nana', mail:'andreivascul2004@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758906487', username: 'Nenea Ion', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683708806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1687228806487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683758806487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683748806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683755806487', username: 'Deiu',mail:'andreivascul2004@gmail.com', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683758876487', username: 'Nana', mail:'andreivascul2004@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758606487', username: 'Nenea Ion', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1683756806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683778806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683798806487', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1683158806487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683258806487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683728806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683723806487', username: 'Deiu',mail:'andreivascul2004@gmail.com', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683128806487', username: 'Nana', mail:'andreivascul2004@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1682758806487', username: 'Nenea Ion', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1682757806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683458806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683758406487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683753806487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683754806487', username: 'Deiu',mail:'andreivascul2004@gmail.com', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683758506487', username: 'Nana', mail:'andreivascul2004@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758906487', username: 'Nenea Ion', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683708806487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683728806487', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1687228806487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683418826487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683741802487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1641752806487', username: 'Deiu',mail:'andreivascul2004@gmail.com', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Nana', mail:'andreivascul2004@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1683758416427', username: 'Nenea Ion', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1684156206487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683741802487', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683798416427', username: 'Iguana11', mail:'andreivascul2004@gmail.com',totalAmount: '50', status: 'Delivered' },
      { orderDate: '1684158206487', username: 'Vascool2', mail:'andreivascul2004@gmail.com',totalAmount: '80', status: 'Delivered' },
      { orderDate: '1683418826487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683741802487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683723806487', username: 'Deiu',mail:'andreivascul2004@gmail.com', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Nana', mail:'andreivascul2004@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1682758841482', username: 'Nenea Ion', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1684157206487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683454106287', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Vascool', mail:'andreivascul2004@gmail.com', totalAmount: '200', status: 'Delivered' },
      { orderDate: '1683741802487', username: 'john24',mail:'andreivascul2004@gmail.com', totalAmount: '15', status: 'Cancelled' },
      { orderDate: '1683723806487', username: 'Deiu',mail:'andreivascul2004@gmail.com', totalAmount: '180', status: 'Shipping' },
      { orderDate: '1683418826487', username: 'Nana', mail:'andreivascul2004@gmail.com',totalAmount: '23', status: 'Delivered' },
      { orderDate: '1682758841482', username: 'Nenea Ion', mail:'andreivascul2004@gmail.com', totalAmount: '100', status: 'Shipping' },
      { orderDate: '1684157206487', username: 'Andrei',mail:'andreivascul2004@gmail.com', totalAmount: '230', status: 'Cancelled' },
      { orderDate: '1683454106287', username: 'Ioana',mail:'andreivascul2004@gmail.com', totalAmount: '16', status: 'Shipping' }
    ];
    const [ isVisible , setIsVisible ] = useState(false);
    useEffect(() => {
          if(!localStorage.getItem('token') || state.user.role !== 'admin') navigate('/login');
          else setIsVisible(true);
          // axios.get('/admin/orders', {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}})
          // .then(res => {
            setState({ ...state, orders: [...orders]})
          //})
          // .catch(err => {
          //   setState({...state, toast:{text:err.response.data.message, success:false}});
          //   navigate('/login')
          // })
    }, [])
    const [filter, setFilter] = useState('');
    const [dateFilter, setDateFilter ] = useState('Newest');
    const [ productLimit , setProductLimit ] = useState(14);
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return (
    <main>
      {isVisible && <div className="flex flex-col-reverse lg:flex-row w-full gap-3">
        <div className="w-full lg:w-/1/2 flex flex-col gap-3">
          <section className='border border-[var(--gray)] p-2'>
            <h4>sex Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eum sequi error facere obcaecati accusamus tempore debitis repellendus? Optio distinctio fugit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium illum laboriosam, possimus nostrum eius impedit itaque quas corporis, cupiditate explicabo commodi labore, officia placeat ad perferendis ipsa officiis sit deserunt amet quia sed molestias. Delectus quidem esse vero nam labore. repellat culpa dignissimos facilis iure eius reiciendis maxime tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt maiores illum qui saepe commodi dicta omnis aliquid iste dolorum ea rerum enim nisi laudantium, quo ex fugit ipsa molestiae officia!</h4>
          </section>
          <section className='border border-[var(--gray)] p-2'>
            <h4>sex Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eum sequi error facere obcaecati accusamus tempore debitis repellendus? Optio distinctio fugit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium illum laboriosam, possimus nostrum eius impedit itaque quas corporis, cupiditate explicabo commodi labore, officia placeat ad perferendis ipsa officiis sit deserunt amet quia sed molestias. Delectus quidem esse vero nam labore. repellat culpa dignissimos facilis iure eius reiciendis maxime tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt maiores illum qui saepe commodi dicta omnis aliquid iste dolorum ea rerum enim nisi laudantium, quo ex fugit ipsa molestiae officia!</h4>
          </section>
        </div>
        <div className="h-full w-full lg:w-/1/2 transition-all duration-500">
          <section className='flex flex-col border border-[var(--gray)]'>
            <div className='w-full flex text-[var(--bg)] p-2 bg-[var(--blue)] font-semibold'>
              <div className='w-1/4 p-1'>
                  <select name='status' id='status' className='bg-[var(--blue)] cursor-pointer '>
                      <option onClick={()=>setDateFilter('Newest')}>Newest</option>
                      <option onClick={()=>setDateFilter('Oldest')}>Oldest</option>
                  </select>
              </div>
              <div className='w-1/4 p-1'>User</div>
              <div className='w-1/4 p-1'>Amount</div>
              <div className='w-[12%] p-1'>
                <select name='status' id='status' className='bg-[var(--blue)] cursor-pointer'>
                      <option onClick={()=>setFilter('')}>All</option>
                      <option onClick={()=>setFilter('Shipping')}>Shipping</option>
                      <option onClick={()=>setFilter('Delivered')}>Delivered</option>
                      <option onClick={()=>setFilter('Cancelled')}>Cancelled</option>
                  </select>
              </div>
            </div>
            {/* Orders */}
            {orders.length > 0 && orders.filter(order => order.status.includes(filter)).sort((a,b)=>dateFilter==='Newest'?b.orderDate-a.orderDate:a.orderDate-b.orderDate).slice(0,productLimit).map((order, index) => (
              <div key={index} className={`w-full flex hover:bg-[var(--gray)] ${index%2==1&&'bg-[#8881]'}`}>
                <div className='w-1/4 p-1'>
                  {new Date(parseInt(order.orderDate)).getDate()}&nbsp;
                  {MONTHS[new Date(parseInt(order.orderDate)).getMonth()]}&nbsp;
                  {(new Date(parseInt(order.orderDate)).getFullYear())%100}'
                </div>
                <div className="w-1/4 p-1">
                  <span className='cursor-pointer underline' 
                  onClick={(e) => { e.preventDefault(); window.open(`mailto:${order.mail}?subject=Order%20Update&body=Good%20morning/afternoon/evening,%20your%20order%20has%20been%20....`, '_blank'); }}>{order.username}</span>
                </div>
                <div className='w-1/4 p-1 font-semibold'>&pound;{order.totalAmount}</div>
                <div className='w-1/4 p-1'>
                  {order.status === 'Delivered' && <span className='text-[#0c0]'>Delivered</span>}
                  {order.status === 'Cancelled' && <span className='text-[#c00]'>Cancelled</span>}
                  {order.status === 'Shipping' && <span className='text-[var(--blue)]'>Shipping</span>}
                </div>
              </div>
            ))}
            {orders.length > productLimit && 
            <span className='w-full text-center hover:bg-[var(--gray)] mx-auto py-1 cursor-pointer font-semibold' onClick={()=> setProductLimit(productLimit+50)}>...load more</span>}
            {orders.length < productLimit && 
            <span className='w-full text-center hover:bg-[var(--gray)] mx-auto py-1 cursor-pointer font-semibold' onClick={()=>setProductLimit(14)}>...load less</span>}
          </section>
        </div>
      </div>}
    </main>
  )
}

export default AdminOrders