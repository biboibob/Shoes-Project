import React from 'react'

function CardModel({image, label, className}) {
  return (
    <div className={`flex relative  bg-dark-gray rounded-lg basis-1/3 max-h-20 md:max-h-80`}>
        <img src={image} className={"object-cover object-top ml-auto md:object-contain w-32 md:!w-auto"}/>
        <span className='order-first my-auto ml-3 md:absolute text-white text-lg md:text-2xl stroke-black stroke-2 font-bold bottom-5 left-5'>{label}</span>
    </div>
  )
}

export default CardModel