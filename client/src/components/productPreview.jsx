import {useContext} from 'react'
import { MyContext } from '../Context'
import './Components.css'

const ProductPreview = ({product}) => {
  const {state, setState} = useContext(MyContext);
  const {wishlist} = state.user;
  const toggleWishlist = (id) => {
      if(wishlist.find(item => item._id === id)) {
        setState({...state, wishlist: wishlist.filter(item => item._id !== id)}) // if item is in wishlist, remove it
      } else {
        setState({...state, wishlist: [...wishlist, id]}) // if item is not in wishlist, add it
      }
  }
  return (
    <div className='flex flex-col gap-1 text-[var(--text)] cursor-pointer relative h-full overflow-hidden max-h-[min(30rem,80vh)]'>
        <div className='aspect-[5/6] overflow-hidden relative rounded-xl '>
            <img id='productImg' className='h-full ' src={product.images[0]} width={'100%'} alt="" />
            <div onClick={()=>toggleWishlist(product._id)} className="svgContainer absolute right-0 top-0 m-3 flex items-center justify-center z-[1]">
                <svg fill={wishlist.find(item => item._id === product._id)?'red':'var(--bg)'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={'var(--text)'} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
            </div>
        </div>
        <div className="flex flex-col px-1 gap-[1px]">
          <p className='font-[500] flex justify-between'>
            <span className='line-clamp-1'>{product.title}</span> 
            <span className='flex items-center gap-[2px] text-sm'>
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