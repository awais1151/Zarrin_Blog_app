import React from 'react'

const Email = () => {
  return (
    <div className='w-full min-h-80 bg-[#7C4EE4] text-white  flex flex-col justify-center items-center space-y-5 relative mt-20 overflow-hidden '>
      <div className='absolute -left-10 -top-40 '>
        <img src="Images/left.png" alt="" />
      </div>

      <div className='text-4xl text-white text-center font-medium'>
        Get our stories delivered From<br /> us to your inbox weekly.
      </div>
      <div className='space-x-2'>
        <input type="text" placeholder='Your Email' className='bg-white h-10 px-5 rounded-md
     outline-[#7C4EE4]'  />
        <button className='border border-white px-4 py-2 rounded-lg'>Get started</button>
      </div>
      <div className='text-sm text-gray-200'>
        Get a response tomorrow if you submit by 9pm today. If we received after <br /> 9pm will get a reponse the following day.
      </div>
       <div className='absolute -right-10 -bottom-40 '>
        <img src="Images/right.png" alt="" />
      </div>
    </div>
  )
}

export default Email