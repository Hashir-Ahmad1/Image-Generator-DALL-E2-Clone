import React from 'react'

function FormField({LabelName,type,placeholder,name,value,handleChange,isSurpriseMe,handleSurpriseMe}) {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-bold font-md text-gray-700'>
            {LabelName}
        </label>
        {   isSurpriseMe && (
            <button 
                type='button' 
                className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px]' 
                onClick={handleSurpriseMe}
            >
            Surprise Me
            </button>)
        }
      </div>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none
        block w-full p-3 focus:ring-[#4649ff] focus:border-[#4649ff]'
      />
    </div>
  )
}

export default FormField
