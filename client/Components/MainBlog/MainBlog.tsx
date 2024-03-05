import React from 'react'

const MainBlog = () => {
    return (
        <div className='w-full min-h-[32rem] bg-[#7C4EE4] text-white  flex flex-col justify-center items-center space-y-5 relative   overflow-hidden  '>
            <div className='absolute -left-9 -top-64 '>
                <img src="Images/left.png" alt="" />
            </div>

            <div className=' md:grid md:grid-cols-2   '>
                <div className='   flex  flex-col  justify-center items-center gap-7 '>
                    <div className=' text-3xl md:text-5xl md:font-medium  text-white text-justify leading-snug  '>How AI will<br /> Change the Future</div>
                    <div className='text-white text-sm   w-[63%]'>
                        The future of AI will see home robots having enhanced intelligence, increased capabilities, and becoming more personal and possibly cute. For example, home robots will overcome navigation, direction
                    </div>
                     <div className=' w-[63%] text-start '>
                     <button className='bg-white text-black p-2 px-5 rounded-lg shadow-md '>Read More</button> 
                     </div>
                </div>

                <div className='   flex justify-center items-center '>

                    <img src="Images/blogimg.png" alt="blogImage" className='max-w-96  z-20' />

                </div>
            </div>

            <div className='absolute -right-36 -bottom-52 '>
                <img src="Images/right.png" alt="" />
            </div>
        </div>
    )
}

export default MainBlog