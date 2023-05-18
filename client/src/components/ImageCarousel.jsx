import React, { useState } from 'react';
import './Components.css';

function ImageCarousel({images}) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className='w-full h-full max-h-[50vh] max-w-[60vh] flex max-md:flex-col items-center gap-1 relative'>
      {/* CAROUSEL */}
      <div className="relative aspect-[1/1] w-full h-full;">
        {images.map((imageUrl, index) => (
          <img id='productImg'
            key={index} src={imageUrl} alt=""
            className={`absolute w-full h-full transition-all rounded-xl duration-500 
            ${index===activeIndex?'translate-x-0':'-translate-x-[100vw]'}`}
          />
        ))}
      </div>
      {/* PREVIEW */}
      {images.length > 1 && <div className="flex md:flex-col rounded-md">
        {images.map((imageUrl, index) => (
          <div  key={index} onClick={() => setActiveIndex(index)}
          className={`h-12 w-12 sm:w-16 sm:h-16 cursor-pointer border-[3px] rounded-md 
          ${index===activeIndex?'border-[var(--primary)]':'border-[var(--secondBg)]'}`}>
            <img src={imageUrl} alt="" className="w-full h-full rounded-sm" />
          </div>
        ))}
      </div>}
    </section>
    
  );
}

export default ImageCarousel;