import React, {useContext} from 'react'
import { MyContext } from '../Context'
import { Link, useLocation } from 'react-router-dom'
import png from '../assets/face-wash-png.png'

const Products = () => {
    const { state } = useContext(MyContext);
    const { products } = state;
    const location = useLocation();
    
    return (
    <main className='sm:px-8 p-4 bg-[var(--secondBg)]'>
        <section className='grid max-sm:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-3'>
            {/* Placeholders */}
            {products.loading && Array(12).fill(0).map((_,i) => 
                <div key={i} className="placeholder rounded-3xl p-3 gap-2 flex flex-col bg-[var(--bg)]">
                    <div className="rounded-3xl w-full aspect-[3/4]"></div>
                    <div className='mt-auto h-6 w-3/5'></div>
                    <div className="mt-1 h-4 w-[80%]"></div>
                    <div className="h-4 w-[90%]"></div>
                    <div className="mb-1 h-4 w-3/4"></div>
                </div>
            )}
            {/* Products */}
            {products.list.length > 0 && products.list.map(product => (
                <Link to={`/products/${product.title.replace(/\s+/g,'-').toLowerCase()+'='+product._id}`} 
                key={product._id} state={{ background: location }}
                className='rounded-3xl p-3 flex flex-col bg-[var(--bg)] gap-2 text-[var(--text)]
                 hover:shadow-md shadow-[var(--text)] cursor-pointer relative'>
                    <div className='rounded-xl aspect-[3/4] mb-auto overflow-hidden relative'>
                        <img className='transition-all duration-300 h-full object-cover' src={product.images[0]} width={'100%'} alt="" />
                    </div>
                    <h4>{product.title} - ${product.price}</h4>
                    <div className="flex justify-between items-center">
                        <p>{product.description}</p>
                        <div className="svgContainer flex items-center justify-center absolute bottom-0 right-0 m-2">
                            <svg fill={Math.round(Math.random()*3)%3==0?'red':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--bg)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                        </div>
                    </div>
                   
                </Link>
            ))}
        </section> 
        {products.error && <h1 className='text-center'> Error: {products.error.message}</h1>}
    </main>
  )
}

export default Products