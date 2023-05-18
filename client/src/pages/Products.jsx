import React, {useContext} from 'react'
import { MyContext } from '../Context'
import { Link, useLocation } from 'react-router-dom'
import ProductPlaceholder from '../components/productPlaceholder'
import ProductPreview from '../components/productPreview'

const Products = () => {
    const { state } = useContext(MyContext);
    const { products } = state;
    const location = useLocation();
    return (
    <main className='sm:px-8 p-4'>
        <section className='grid max-sm:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-3'>
            {/* LOADING... */}
            {products.loading && Array(12).fill(0).map((_,i) => 
                <ProductPlaceholder key={i} />
            )}
            {/* Products */}
            {products.list.length > 0 && products.list.map(product => (
                <Link to={`/products/${product.title.replace(/\s+/g,'-').toLowerCase()+'='+product._id}`} 
                key={product._id} state={{ background: location }} className='h-full'>
                    <ProductPreview product={product} />
                </Link>
            ))}
        </section> 
        {/* ERROR */}
        {products.error&&<h1 className='text-center mt-[25vh]'>Error: <span className='text-[var(--primary)]'>{products.error.message}</span><br/>Please try again later!</h1>}
    </main>
  )
}

export default Products