import './Components.css'

const ProductPreview = ({product}) => {
  return (
    <div className='flex flex-col gap-1 text-[var(--text)]
    cursor-pointer relative h-full
    overflow-hidden max-h-[min(30rem,80vh)] pb-3'>
        <div className='aspect-[5/6] overflow-hidden bg-white border rounded-xl relative p-2'>
          <img style={{objectFit:'contain', width:'100%', height:'100%'}}
          src={product.images[0]} width={'100%'} alt="" />
        </div>
        <div className="flex flex-col px-1 gap-[1px]">
          <p className='font-[500] flex justify-between'>
            <span className='line-clamp-1'>{product.title}</span> 
            <span className='centerAll gap-[2px] text-sm'>
              <svg fill={'var(--text)'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-4 h-4 mb-[2px]"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
              3.42
            </span>
          </p>
          <p className='line-clamp-2 text-sm leading-tight text-[#888]'>{product.description}</p>
        <p className='font-[500] mt-auto'>&pound;{product.price}</p>
        </div>
    </div>
  )
}

export default ProductPreview