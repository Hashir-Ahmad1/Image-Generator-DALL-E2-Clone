import React from 'react'
import {download} from '../assets';
import { downloadImage } from '../utils';

function Card({_id,name,prompt,img}) {
  return (
    <div className='rounded-xl shadow-card hover:shadow-cardhover card relative group'>  
      <img className='w-full h-auto object-cover rounded-xl'
        src={img}
        alt={prompt}
      />
     <div className='group-hover:flex flex-col hidden max-h-[94.5%] bottom-0 left-0 right-0 m-2 p-4 rounded-sm bg-[#10131f] absolute'>
        <p className='text-white text-md font-medium overflow-y-auto prompt'>
          {prompt}
        </p>
        <div className='mt-5 justify-center items-between flex gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 text-white text-xs flex justify-center items-center font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button type='button' onClick={()=>downloadImage(_id,img)} className='outline-none bg-transparent border-none'>
            <img src={download} alt='download' className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
     </div>
    </div>
  )
}

export default Card
