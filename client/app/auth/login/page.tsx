'use client'
// Import necessary dependencies and components
import useAuthStore from '@/zustand/auth.zustand';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the functional component 'Page'
const Page: FC = () => {
  const router = useRouter();
  const [isLoggin, setIsLoggin] = useState<boolean>(false);
  const { login, isLoggedin,token } = useAuthStore();
  const [fr, setFr] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    console.log("Inside useEffect");
    const isLoggedin = JSON.parse(localStorage.getItem('Auth') || '{}')?.state?.isLoggedin;
    console.log("isLoggedin from localStorage:", isLoggedin);
    setIsLoggin(!!isLoggedin);
    if (!isLoggedin) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setFr(false);
    try {
       login(loginData);   
    } catch (error:any) {
      console.log(error);
      toast.error('Login Failed', { /* toast configuration */ });
      router.push('/auth/login');
    }
  };
  useEffect(()=> {
    if(!fr){
      if(isLoggedin){
        toast.success('Login Successfully', { /* toast configuration */ });
        router.push('/');
      }else{
        setIsLoggin(false);
        toast.error('Invalid credenils...', { /* toast configuration */ });
      }
    }
    
  }, [token, isLoggedin])
  console.log("isLoggin:", isLoggin);

  // JSX for the login page
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id='email' name='email'
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id='password' name='password'
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleInputChange}
            />
          </div>
          <Link
            href="/auth/forget-password"
            className="text-xs text-purple-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-6" onClick={handleSubmit}>
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Dont have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Export the 'Page' component as the default export
export default Page;