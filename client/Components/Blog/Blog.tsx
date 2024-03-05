'use client'
import useBlogStore from '@/zustand/blog.zustand'
import Link from 'next/link';
import React, { useEffect } from 'react'

const Blog = () => {

    function getFirst84Characters(paragraph:string) {
        // Use substring to get the first 84 characters
        var first84Characters = paragraph.substring(0, 84);
        return first84Characters;
          }

    const { getAllBlogs, blogs } = useBlogStore()


    useEffect(() => {
        getAllBlogs()
    }, [])

    return (
        <div className='flex justify-center items-center min-h-screen'>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>

                {blogs.map((blog: any) => {
                    // console.log(blog?._id)
                    return (
                         
                        <div key={blog?._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg w-full max-h-52 object-cover" src={blog.image || "/Images/blog.jpg"} alt="" />
                            </a>
                            <div className="p-5">
                                <div>{blog?.category?.title}</div>
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog?.title}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {
                                getFirst84Characters(blog?.content)}</p>
                                <div>{blog?.user?.name}</div>
                                <Link href={`blog/${blog?._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#7C4EE4] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                })


                }
            </div>


        </div>
    )
}

export default Blog