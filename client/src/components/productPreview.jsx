import React from 'react'
import './Components.css'


const ProductPreview = ({product}) => {
  return (
    <div className='rounded-lg flex flex-col bg-[var(--bg)] gap-2 text-[var(--text)]
    cursor-pointer relative h-full overflow-hidden max-h-[90vh]'>
        <div className='aspect-[5/6] overflow-hidden relative'>
            <img id='productImg' className='h-full object-cover' src={product.images[0]} width={'100%'} alt="" />
        </div>
        <div className="flex flex-col p-3 pt-0">
          <h4 className='mb-auto'>{product.title}-${product.price}</h4>
          <div className="flex justify-between items-center">
              <p className='line-clamp-3'>{product.description}</p>
              <div className="svgContainer flex items-center justify-center absolute bottom-0 right-0 m-2">
                  <svg fill={Math.floor(Math.random()*6)%6==0?'red':'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--bg)'} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </div>
          </div>
        </div>
    </div>
  )
}

export default ProductPreview