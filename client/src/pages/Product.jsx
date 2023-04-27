import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MyContext } from '../Context'
import axios from 'axios'
import './Pages.css'
// import ImageCarousel from '../components/ImageCarousel'
import png from '../assets/face-wash-png.png'

const Product = () => {
    let { id } = useParams()
    id = id.substring(id.indexOf('=')+1);
    const { state, setState } = useContext(MyContext);
    const { products, documentTitle, modalOpen } = state;
    const [ animate , setAnimate ] = useState(100);

    if(!products){
      setState({...state, products: {...products, loading: true}});
      axios.get('/products')
        .then(res => { setState({...state, products: {list: res.data.products, loading: false, err: null}}) })
        .catch(err=> { setState({...state, products: {list: [], error: err, loading: false}}) })
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
    function CloseModal(){
      setAnimate(100);
      setTimeout(() => {navigate('/products')}, 500);
    }
    function OpenCategories(){
      setAnimate(100);
      setTimeout(() => {navigate('/categories')}, 500);
    }
    return (
    <main className='sm:px-8 bg-[var(--bg)] fixed top-0 w-screen transition-all duration-500 overflow-scroll h-screen'
    style={{transform: `translateX(${animate}vw)`}}>
      <div className='relative'>
        {/* Controls */}
        {product && <div className="flex justify-between max-sm:p-8 max-sm:mt-4 p-[0.7rem] overflow-visible mb-2 absolute top-0 w-full">
          <button onClick={() => CloseModal()} className='svgContainer h-7 w-7'>
            <svg className="h-8 w-8 text-[var(--text)] hover:text-[var(--primary)] transition-all duration-300 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={'var(--text)'}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={() => OpenCategories()} className='svgContainer h-7 w-7'>
            <svg className="h-8 w-8 text-[var(--text)] hover:text-[var(--primary)] transition-all duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          </button>
        </div>}

        {/* Product */}
        {product ?
          <section className="flex max-sm:flex-col gap-4 max-sm:p-8">
            <div key={product.id} className='rounded-3xl flex items-center justify-center aspect-square w-full sm:w-auto max-h-[50vh]'>
              <img className='rounded-xl h-full object-cover' src={product.images[0]} alt="" />
            </div>
            <div>
              <h3>{product.title} - ${product.price}</h3>
              <p>{product.description}</p>
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
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reprehenderit doloremque earum numquam facilis dolorem, voluptatum fuga voluptatibus suscipit soluta!</h1>
      </div>
    </main>
  )
}

export default Product