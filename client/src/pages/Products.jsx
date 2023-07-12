import React, {useContext} from 'react'
import { MyContext } from '../Context'
import { Link } from 'react-router-dom'
import ProductPlaceholder from '../components/productPlaceholder'
import ProductPreview from '../components/productPreview'

const Products = () => {
    const { state } = useContext(MyContext);
    const { products } = state;
    return (
    <main className='sm:px-8 p-4'>
        <section className='grid max-sm:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3'>
            {/* LOADING... */}
            {products.loading && Array(12).fill(0).map((_,i) => 
                <ProductPlaceholder key={i} />
            )}
            {/* Products */}
            {products.list.length > 0 && products.list.map(product => (
                <Link to={`/products/${product.title.replace(/\s+/g,'-').toLowerCase()+'='+product._id}`} 
                key={product._id} className='h-full' onClick={() => scrollTo(0,0)}>
                    <ProductPreview product={product} />
                </Link>
            ))}
            {products.list.length > 0 && products.list.map(product => (
                <Link to={`/products/${product.title.replace(/\s+/g,'-').toLowerCase()+'='+product._id}`} 
                key={product._id} className='h-full' onClick={() => scrollTo(0,0)}>
                    <ProductPreview product={product} />
                </Link>
            ))}
            {products.list.length > 0 && products.list.map(product => (
                <Link to={`/products/${product.title.replace(/\s+/g,'-').toLowerCase()+'='+product._id}`} 
                key={product._id} className='h-full' onClick={() => scrollTo(0,0)}>
                    <ProductPreview product={product} />
                </Link>
            ))}
        </section> 
        {/* ERROR */}
        {products.error&&<div className='centerAll text-center mt-4 flex-col'>
            <h1 className='text-[var(--primary)]'>{products.error.message}</h1>
            <h2>Check your connection and try again!</h2>
        </div>}
    </main>
  )
}

export default Products