import React from 'react'

const Footer = () => {
  return (
    <div className=' w-full   mt-10   py-8 flex  flex-col justify-center items-center  space-y-4   bg-white '>
        
         <div className=' flex space-x-3'>
         <img src="Images/logo.png" alt="" className='  h-9' />
         <span className='text-2xl font-bold'>Zarrin</span>
         </div>

         <div className='flex space-x-10'>
            <p>Home</p>
            <p>Blog</p>
            <p>About</p>
            <p>Contact Us</p>
         </div>

         <div className='flex space-x-5'>
            <div className=' bg-[#7C4EE4] rounded-full py-2 px-3  text-[#FFFFFF] text-center'>
                FB
            </div>

            <div className=' bg-[#7C4EE4] rounded-full  py-2 px-3  text-[#FFFFFF] text-center'>
                IG
            </div>
            <div className=' bg-[#7C4EE4] rounded-full  py-2 px-2.5  text-[#FFFFFF] text-center'>
                LN
            </div>
            <div className=' bg-[#7C4EE4] rounded-full  py-2 px-3  text-[#FFFFFF] text-center'>
                YT
            </div>
         </div>

         <div className='border border-t-0 border-[#D9D9D9] w-full container shadow-slate-900 '>

         </div>

         <div className='text-[#150E06] text-sm'>
         Copyright Ideapeel Inc © 2024. All Right Reserved
         </div>
        </div>
  )
}

export default Footer