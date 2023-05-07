import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../Context'
import ProductPreview from '../../components/productPreview'

const AdminProducts = () => {
    const { state, setState } = useContext(MyContext);
    const { products } = state;
    const navigate = useNavigate();
    useEffect(() => {
        if(state.user.role !== 'admin') navigate('/');
        if(!products&& state.user.role === 'admin') navigate('/admin');
    }, [])
    const [ isEditor , setIsEditor ] = useState(false);
    const [ localProduct , setLocalProduct ] = useState();
    const openEditor = (id) => {
        setIsEditor(true);
        setLocalProduct(products.list.find(item => item._id === id));
    }
    const [ newImageURL , setNewImageURL ] = useState();
    const addImage = () => {
        setLocalProduct({...localProduct, images:[...localProduct.images, `https://drive.google.com/uc?id=${newImageURL.match(/\/d\/(.+?)\//)[1]}`]})
    }
    const deleteImage = (index) => {
        setLocalProduct({...localProduct, images: localProduct.images.filter((_, i) => i !== index)})
    }
    const [ categiores , setCategiores ] = useState(['Electronics', 'Clothes', 'Skincare', 'Toys', 'Furniture', 'Books', 'Other']);
    const [ productPerks , setProductPerks ] = useState(['Cruelty Free', 'Vegan', 'Organic', 'Recycled', 'Handmade']);
    const saveChanges = () => {
        setIsEditor(false);
        setState({...state, toast: {text: 'Product updated successfully!', success: true},
            products:{...products, list: products.list.map(item => item._id === localProduct._id ? localProduct : item)}});
        // axios.get('/admin', {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}})

    }
    return (
    <>
        {/* EDITOR */}
        <div className="fixed w-screen z-10 h-screen flex items-center justify-center transition-all duration-300" style={{transform: isEditor ? 'translateX(0)' : 'translateX(-100vw)'}} >
            <div className="w-screen h-screen absolute"onClick={()=> {if(isEditor) setIsEditor(false)}}></div>
            <section className='border border-[#8886] rounded-xl bg-[var(--bg)] w-[96%] sm:w-4/5 max-w-[56rem] z-10 p-2 max-sm:mb-20 sm:mt-16'>
                {/* Product */}
                {localProduct && <section className="flex flex-col gap-2">
                        {/* All images */}
                        <div className="flex gap-1">
                            {localProduct.images && localProduct.images.map((_, index) => (
                            <div key={index} className='overflow-hidden border-2 border-[var(--secondBg)] relative rounded-xl flex items-center justify-center aspect-square max-w-[25%] sm:w-auto max-h-[20vh]'>
                                <img className='rounded-xl object-cover w-full h-full' src={localProduct.images[index]} alt="" />
                                <div className="hover:bg-[#f00] cursor-pointer bg-[var(--secondBg)] absolute w-full h-1/3 bottom-0 flex items-center justify-center" onClick={()=>deleteImage(index)}>Delete</div>
                            </div>))}
                        </div>
                        {/* Add new images */}
                        {localProduct.images.length < 4 && 
                        <div className='h-12 w-full flex justify-between items-center relative gap-2'>
                            <div className="w-full h-full">
                                <input type='text' name="url" placeholder="Enter image URL" 
                                value={newImageURL} onChange={(e)=>setNewImageURL(e.target.value)}
                                className='bg-[var(--secondBg)] rounded-xl p-1 px-3 h-full w-full md:text-lg resize-none overflow-scroll'
                                />
                            </div>
                            <div className="hover:bg-[var(--blue)] rounded-xl cursor-pointer bg-[var(--secondBg)] h-full py-2 px-4 flex items-center justify-center" onClick={()=>addImage()}>
                                <h4>Add</h4>
                            </div>
                        </div>}
                        <div className='flex flex-col gap-2'>
                        <hr className='border-[#8884]' />
                            <div className="flex gap-2 h-12"> 
                                <input placeholder='Title' name='title' type="text" value={localProduct.title} onChange={(e)=>setLocalProduct({...localProduct,title:e.target.value})} className='bg-[var(--secondBg)] rounded-xl p-1 h-12 px-3 w-full md:text-lg'/>

                                <input name='price' type="number" value={localProduct.price} onChange={(e)=>setLocalProduct({...localProduct,price:e.target.value})} placeholder='&pound; price' className='bg-[var(--secondBg)] rounded-xl p-1 px-3 h-full w-[20%] md:text-lg min-w-[5rem]'
                                />
                            </div>
                            
                        <hr className='border-[#8884]' />
                        <div className="flex gap-8 max-sm:flex-col w-full">
                            <hr className='border-[#8884] sm:hidden' />
                            {/* make checkboxes for categories */}
                            <div className="grid grid-cols-5 gap-1 items-start text-sm sm:w-1/2">
                                <span className='text-[var(--blue)] font-semibold'>Categories: </span>
                                {categiores.map((category, index) => (
                                    <div key={index} className='flex items-center p-1 bg-[var(--secondBg)] h-6 rounded-sm'>
                                        <input type="checkbox" name={category} id={category} />
                                        <label htmlFor={category}>{category}</label>    
                                    </div>
                                ))}    
                            </div>
                            <hr className='border-[#8884] sm:hidden' />
                            {/* make checkboxes for perks */}
                            <div className="flex flex-wrap gap-1 items-start text-sm sm:w-1/2">
                                <span className='text-[var(--blue)] font-semibold'>Perks: (only pick 3)</span>
                                {productPerks.map((perk, index) => (
                                    <div key={index} className='flex items-center p-1 bg-[var(--secondBg)] h-6 rounded-sm'>
                                        <input type="checkbox" name={perk} id={perk} />
                                        <label htmlFor={perk}>{perk}</label>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <hr className='border-[#8884]' />
                        <div className="flex gap-2" >
                            <textarea rows="3" className='bg-[var(--secondBg)] rounded-xl p-1 px-3 h-full w-full md:text-lg resize-none' name='description' type="text" placeholder="Description" value={localProduct.description} onChange={(e)=>setLocalProduct({...localProduct,description:e.target.value})} />
                            <div className="hover:bg-[var(--blue)] bg-[var(--secondBg)] cursor-pointer flex items-center rounded-xl justify-center text-center" onClick={()=> saveChanges()}>Save Changes</div>
                        </div>

                    </div>
                </section>}
            </section>
        </div>

        {/* MAIN */}
        <main className='bg-[var(--secondBg)] p-4' style={{filter: isEditor ? 'blur(4px) brightness(0.8)':'none'}}>
            <h1 align={'center'}>All Products</h1>
            <section className='grid max-sm:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-3'>
                {/* Products */}
                {products.list.length > 0 && products.list.map(product => (
                    <div key={product._id} className='h-full' onClick={()=>openEditor(product._id)}>
                        <ProductPreview product={product} />
                    </div>
                ))}
            </section>
        </main>
    </>
  )
}

export default AdminProducts