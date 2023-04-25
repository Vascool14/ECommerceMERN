import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { MyContext } from '../Context'

const Product = () => {
    const { id } = useParams()
    const { state, setState } = useContext(MyContext);
    const { products } = state;
    const product = products.list.find(product => product.id === id)
    return (
    <main>
        <h1>Product Page</h1>
        <h3>ID: {id}</h3>
        {product && 
        <div key={product.id} className='rounded-3xl p-4 bg-[var(--text)] text-[var(--bg)]'>
          <h3>{product.title} - ${product.price}</h3>
          <p>{product.description}</p>
          <img className='rounded-xl aspect-square' src={product.images[0]} width={'100%'} alt="" />
        </div>}
    </main>
  )
}

export default Product