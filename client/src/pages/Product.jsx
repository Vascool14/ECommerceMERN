import React, {useContext, useEffect, useState, useRef} from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { MyContext } from '../Context'
import axios from 'axios'
import './Pages.css'
import ImageCarousel from '../components/ImageCarousel'
import ProductPreview from '../components/productPreview'

const Product = () => {
    let { id } = useParams()
    id = id.substring(id.indexOf('=')+1);
    const { state, setState } = useContext(MyContext);
    const { products, documentTitle, user } = state;
    const [ animate , setAnimate ] = useState(100);
    if(!products){
      setState({...state, products: {...products, loading: true}});
      axios.get('/products')
        .then(res => { setState({...state, products: {list: res.data.products, loading: false}}) })
        .catch(err=> { setState({...state, products: {list: [], loading: false, toast: {text: err, success: false}}}) })
    }
    const product = products.list.find(product => product._id === id)
    useEffect(() => {
      setAnimate(0);
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';
      if(product) setState({...state, modalOpen:true, documentTitle: {...documentTitle, after: ` | ${product.title}`}})
      document.title = documentTitle.title + documentTitle.after;
      
      return () => { 
        setState({...state, modalOpen:false , documentTitle: {...documentTitle, after: ''}});
        body.style.overflow = 'auto';
      }
    }, [])
    const navigate = useNavigate();
    // const recentlyViewedProducts = products.list.filter(product => user.recentlyViewed.includes(product._id));
    const location = useLocation();
    const upAnchor = useRef(null);
    const goTo = (product) => {
      navigate(`/products/${product.title.replace(/\s+/g,'-').toLowerCase()+'='+product._id}`, {state: {background: location.pathname}});
      upAnchor.current.scrollIntoView({behavior: 'smooth'}); 
    }
    return (
    <main className='bg-[var(--bg)] fixed top-0 w-screen transition-all duration-500 overflow-scroll h-screen z-10'
    style={{transform: `translateX(${animate}vw)`}}>
      <div className="absolute w-1 h-1 top-[-1rem]" ref={upAnchor}></div>
      <div className='relative'>
        {/* Controls */}
        {product && 
        <button onClick={() => navigate(-1)} className='svgContainer z-10 h-7 w-7 absolute top-0 left-[0.1rem] m-2'>
          <svg className="h-8 w-8 text-[var(--text)] hover:text-[var(--primary)] transition-all duration-300 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={'var(--text)'}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
        </button>}

        {/* Product */}
        {product ?
          <section className="flex max-md:flex-col items-center justify-center gap-4 max-sm:pt-8">
             <ImageCarousel images={product.images} />
            <div>
              <h3>{product.title} - ${product.price}</h3>
              <p>{product.description}</p>
              <button onClick={() => addToCart()}></button>
            </div>
          </section>
          :
          // Placeholders
          <section className="flex w-full max-sm:flex-col gap-4">
              <div className="placeholder rounded-3xl p-3 gap-2 flex flex-col bg-[var(--bg)] w-full sm:w-1/2">
                <div className='flex justify-center mt-1 h-6 w-3/5'></div>
                <div className="mt-1 h-4 w-[80%]"></div>
                <div className="h-4 w-[90%]"></div>
                <div className="mb-1 h-4 w-3/4"></div>
                <div className="mt-auto rounded-xl w-full aspect-square"></div>
              </div>
              <div className="flex flex-col">
                <div className='flex justify-center mt-1 h-6 w-3/5 bg-[var(--bg)]'></div>
                <div className="mt-1 h-4 w-[80%]"></div>
                <div className="h-4 w-[90%]"></div>
                <div className="mb-1 h-4 w-3/4"></div>
              </div>
          </section>
        }
        <h2>Details:</h2>
        <p>Adipisicing elit. Aspernatur reprehenderit doloremque earum numquam facilis dolorem, voluptatum fuga voluptatibus suscipit soluta!</p>
        <h2>Reviews:</h2>
        <p>Lorem, ipsum dolor voluptatum fuga voluptatibus suscipit soluta!</p> 
      </div>

      {/* SIMILAR */}
        <>
          <h2>View similar</h2>
          <section className='grid grid-cols-4 gap-2 w-full'>
          {products.list.slice(0,4).map((product) => (
              <div onClick={() => goTo(product)}
              key={product._id} state={{ background:location }}>
                <ProductPreview product={product} />
              </div>
          ))}
        </section>
        </>

        {/* Recently Viewed
        {user.recentlyViewed.length > 0 && 
        <>
          <h2>Recently viewed</h2>
          <section className='flex gap-2 p-0'>
          {recentlyViewedProducts.map((product) => (
              <Link to={`/products/${product._id}`}
              key={product._id} state={{ background:location }}
              className='shadow-[var(--secondBg)] hover:shadow-md rounded-xl cursor-pointer'>
                <ProductPreview product={product} />
              </Link>
          ))}
        </section>
        </>} */}
    </main>
  )
}

export default Product