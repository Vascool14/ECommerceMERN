import React, {useContext} from 'react'
import { MyContext } from '../Context'
import Loader from '../components/Loader';

const Products = () => {
    const { state, setState } = useContext(MyContext);
    const { products } = state;

    if(products.loading) return <main className='flex items-center justify-center'><Loader /></main>
    if(products.error) return <h1>Error: {products.error}</h1>
    return (
    <main className='px-8 py-4'>
        <div className='flex w-full gap-2'>
            <section className='grid grid-cols-3 gap-2'>
                {products.list.length > 0 && products.list.map(product => (
                    <div key={product.id} className='rounded-3xl p-4 bg-[var(--text)] text-[var(--bg)]'>
                        <h3>{product.title} - ${product.price}</h3>
                        <p>{product.description}</p>
                        <img className='rounded-xl aspect-square' src={product.images[0]} width={'100%'} alt="" />
                    </div>
                ))}
            </section> 
        </div>
    </main>
  )
}

export default Products