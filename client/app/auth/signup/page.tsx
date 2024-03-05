'use client'
// Import necessary dependencies and components
import useAuthStore from '@/zustand/auth.zustand';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
// Define the functional component 'Page'
const Page: FC = () => {
  const router= useRouter();
  const {isLoggedin,login} = useAuthStore();
 // State to hold signup form data
 const [signupData, setSignupData] = useState<{
  name: string;
  email: string;
  password: string;
  role: string;
  file?: File | null;
}>({
  name: "",
  email: "",
  password: "",
  role: "",
  file: null,
});

// Use the useAuthStore hook to get the state and actions
const { signUp } = useAuthStore();

// Handler for input change in the signup form
const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.preventDefault();
  setSignupData({ ...signupData, [e.target.name]: e.target.value });
};

// Handler for file input change for profile image
const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  const file = e.target.files && e.target.files[0];
  console.log(file);
  

  // Check if a file is selected
  if (file) {
      // Store the file in the signupData object
      setSignupData({ ...signupData, file: file });
  }
};

useEffect(() => {
  let isLoggedin:any = localStorage.getItem('Auth');
  isLoggedin = JSON.parse(isLoggedin);
  isLoggedin = isLoggedin?.state?.isLoggedin;
  if(isLoggedin){
    router.push('/')
  }else{
    router.push('/auth/signup')
  }
}, [])

// Handler for form submission
const handleSubmit = async () => {
  try {
      await Promise.all([signUp(signupData)]);
      router.push('/')
  } catch (error) {
      console.log(error);
  }
};

  // JSX for the signup page
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Registration
        </h1>
        <div className="mt-6">
          {/* Add a new input for the profile image */}
          <div className="mb-2">
            <label htmlFor="profileImage" className="block text-sm font-semibold text-gray-800">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleFileInputChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id='name' name='name'
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleInputChange}
            />
          </div>
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
          <div className='mb-2'>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-800"
            >
              Role
            </label>
            <select name="role" id="role" className=' border border-purple-700 rounded-md p-2 outline-purple-700' onChange={handleInputChange}>
              <option value="">Select Role</option>
              <option value="user">Reader</option>
              <option value="writer">Writer</option>
            </select>
          </div>
          <div className="mt-6" onClick={handleSubmit}>
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Signup
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// Export the 'Page' component as the default export
export default Page;