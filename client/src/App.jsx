import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useContext, Suspense, lazy } from 'react'
import axios from 'axios'
import { MyContext } from './Context'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Home from './pages/Home'
import Product from './pages/Product'
import Menu from './components/Menu'
import Login from './pages/auth/Login'
import Account from './pages/auth/Account'
const Register = lazy(() => import('./pages/auth/Register'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Cart = lazy(() => import('./pages/Cart'))
const Products = lazy(() => import('./pages/Products'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminPanel = lazy(() => import('./pages/CMS/AdminPanel'))
const AdminProducts = lazy(() => import('./pages/CMS/AdminProducts'))
const AdminOrders = lazy(() => import('./pages/CMS/AdminOrders'))
const AdminUsers = lazy(() => import('./pages/CMS/AdminUsers'))

axios.defaults.baseURL = 'http://localhost:80'
axios.defaults.withCredentials = true;

export default function App() {
  const html = document.querySelector('html');
  html.setAttribute('data-theme', localStorage.getItem('data-theme') || 'light');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--secondBg')); 

  const { state, setState } = useContext(MyContext);
  const { products, documentTitle } = state;
  document.title = documentTitle.title + documentTitle.after;
  useEffect(() => {
    setState({...state, products: {...products, loading: true}});
    axios.get('/products')
      .then(res => { 
        if(localStorage.getItem('token')){
          axios.get('/users/me', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
          .then(response =>{
            setState({
              ...state,
              user:response.data,
              products: {list: res.data.products, loading: false},
              toast: {text:`Hello, ${response.data.username}!`,success:true}});
          }) 
        }
        else
        setState({...state, products: {list:res.data.products, loading:false, err:null}}) 
      })
      .catch(err=> { setState({...state, products: {list: [], error: err, loading: false}}) })
  }, [])
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
      <div className='App'>
          <Navbar />
          <Menu />
          <Toast />
          <Suspense fallback={
          <main className="fixed z-50 top-0 h-screen w-screen left-0 flex items-center justify-center"> 
        <style>
          {`
          .loader {
            width: 50px;
            height: 50px;
            position: relative;
            z-index: 1;
            transform: translateX(-50%);
          }
          .loader::before,.loader::after {
            content: '';
            position: absolute;
            width: inherit;
            height: inherit;
            border-radius: 50%;
            animation: loader 1s infinite cubic-bezier(0.77,0,0.175,1);
          }
          .loader::before { background-color: var(--text) }
          .loader::after { background-color: var(--blue); animation-delay: 0.5s; }
          @keyframes loader {
            0%, 100% {  left: 35px; }
            25% { transform: scale(.3);  }
            50% {  left: 0%; }
            75% {  transform: scale(1);  }
          }
          `}
        </style>
        <div className="loader"></div>
          </main>}>
            <Routes location={background || location}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<NotFound item={'Page'}/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/products/*" element={<NotFound item={'Product'}/>} />
              {/* ADMIN */}
              <Route path="/admin" element={<AdminPanel />}/>
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Routes> 
            {background && (
            <Routes>
              <Route path="/products/:id" element={<Product/>} />
            </Routes>
            )} 
          </Suspense>
      </div>
  )
}
