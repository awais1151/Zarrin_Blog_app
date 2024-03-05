'use client'
import useAuthStore from '@/zustand/auth.zustand';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Nav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedin, setisLoggedin] = useState(false);
  const { token } = useAuthStore()
  const [state, setState] = useState(false)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const {signout} = useAuthStore();
  useEffect(() => {
    let Auth: any = localStorage.getItem('Auth');
    
    Auth = JSON.parse(Auth);
    setisLoggedin(Auth?.state?.isLoggedin)
  }, [token,state])

  const handleLogout = () =>{
    localStorage.removeItem('Auth');
    signout();
    setState((prev)=>!prev)
  }
  return (
    <div className='top-0 max-w-full sticky z-50'>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/Images/logo.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Zarrin</span>
          </a>
          <div className="flex gap-5 items-center justify-between md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {
              isLoggedin && (
                <div className='flex items-center justify-between gap-2'>
                  <Link href={"/blog/create-blog"} className='font-medium  hidden lg:block text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7C4EE4] md:p-0 bg-[#7C4EE4] shadow-md rounded-lg '> <div className='p-2   '>Create Blog</div></Link>
                  <Link href={"/auth/login"} onClick={handleLogout} className='font-medium  hidden lg:block text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7C4EE4] md:p-0 bg-[#7C4EE4] shadow-md rounded-lg '> <div className='p-2'>Logout</div></Link>
                </div>
              )

            }
            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />

            </button>

            {/* <!-- Dropdown menu --> */}
            <div className="z-50 hidden my-4 text-base list-none bg-gray-500  divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>
            <button onClick={toggleDrawer} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`${isDrawerOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1 sticky`} id="navbar-user">
            <ul className="flex flex-col justify-center items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 px-3 text-white bg-[#7C4EE4] rounded md:bg-transparent md:text-[#7C4EE4] md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <Link href="/blog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7C4EE4] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Blogs</Link>
              </li>
              <li>
                <a href="/blog/category" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7C4EE4] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7C4EE4] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-[#7C4EE4]" placeholder="Search..." />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
