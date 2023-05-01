import React from 'react'
import './Components.css'

const ProductPlaceholder = () => {
  return (
    <div className="placeholder rounded-3xl p-3 gap-2 flex flex-col bg-[var(--bg)]">
        <div className="w-full aspect-[3/4] mb-auto"></div>
        <div className='h-7 w-5/6'></div>
        <div className="h-4 w-[90%]"></div>
        <div className="h-4 w-[80%]"></div>
        <div className="mb-1 h-4 w-3/4"></div>
    </div>
  )
}

export default ProductPlaceholder