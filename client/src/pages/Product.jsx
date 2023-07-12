import React, {useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import { MyContext } from '../Context'
import axios from 'axios'
import './Pages.css'
import ImageCarousel from '../components/ImageCarousel'
import ProductPreview from '../components/productPreview'

const Product = () => {
    let { id } = useParams()
    id = id.substring(id.indexOf('=')+1);
    const { state, setState } = useContext(MyContext);
    const { products } = state;
    if(!products){
      setState({...state, products: {...products, loading: true}});
      axios.get('/products')
        .then(res => { setState({...state, products: {list: res.data.products, loading: false}}) })
        .catch(err=> { setState({...state, products: {list: [], loading: false, toast: {text: err, success: false}}}) })
    }
    const product = products.list.find(product => product._id === id)
    const similarProducts = products.list.filter(product => product.category === product.category && product._id !== id)
    return (
    <main>
      <div className='relative'>
        {/* Product */}
        {product ?
          <section className="flex max-md:flex-col items-center gap-4 max-sm:pt-8">
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
          <section className='grid max-sm:grid-cols-2  
          grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-2 w-full'>
          {similarProducts.map((product) => (
              <Link to={`/products/${product.title.replace(/\s+/g,'-').toLowerCase()+'='+product._id}`} 
              key={product._id} onClick={() => scrollTo({top:0, behavior:'smooth'})}>
                <ProductPreview product={product} />
              </Link>
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