import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { MyContext } from './Context'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './components/Menu'
import Account from './pages/auth/Account'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Product from './pages/Product'
import NotFound from './pages/NotFound'
import axios from 'axios'
import Toast from './components/Toast'
// import Loader from './components/Loader'

axios.defaults.baseURL = 'http://localhost:80'
// axios.defaults.withCredentials = true;

export default function App() {
  const html = document.querySelector('html');
  html.setAttribute('data-theme', localStorage.getItem('data-theme') || 'light');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--secondBg')); 

  const { state, setState } = useContext(MyContext);
  const { products, documentTitle, loading } = state;

  document.title = documentTitle.title + documentTitle.after;
  
  useEffect(() => {
    setState({...state, products: {...products, loading: true}});
    axios.get('/products')
      .then(res => { setState({...state, products: {list: res.data.products, loading: false, err: null}}) })
      .catch(err=> { setState({...state, products: {list: [], error: err, loading: false}}) })
  }, [])

  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className='App'>
        <Navbar />
        <Menu />
        <Toast />
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
          {/* {user._id ==  */}
        </Routes> 
        {background && (
        <Routes>
          <Route path="/products/:id" element={<Product/>} />
        </Routes>
        )} 
    </div>
  )
}
