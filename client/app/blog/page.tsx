import Blog from '@/Components/Blog/Blog'
// import CreateBlog from '@/Components/CreateBlog/CreateBlog'
import Email from '@/Components/Emailbox/Email'
// import Footer from '@/Components/Footer/Footer'
import Header from '@/Components/Header/Header'
import MainBlog from '@/Components/MainBlog/MainBlog'
// import Nav from '@/Components/Navbar/Nav'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#f8f7f7]'>
      {/* <Nav/> */}
      <MainBlog/>
      <Header/>
        <Blog/>
        <Email/>
        {/* <Footer/> */}
        {/* <CreateBlog/> */}
    </div>
  )
}

export default page