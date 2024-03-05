 
import CreateBlog from '@/Components/CreateBlog/CreateBlog'
import React from 'react'

const page = () => {
  return (
    <div className='flex min-h-screen justify-center items-center flex-col'>
      {/* <p className='text-center '>Put your imagination in words to tell others.
      Inspirational stories of individuals who have overcome adversity through the power of positive thinking.
      <br />
      <q>
      The greatest adventure is to live a life filled with purpose, passion, and positivity. Dare to dream, and watch as miracles unfold.
      </q>
      </p> */}
      <div className="divider"></div>
      <CreateBlog/>
    </div>
  )
}

export default page