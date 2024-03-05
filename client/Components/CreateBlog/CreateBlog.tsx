/* eslint-disable react/jsx-no-undef */
'use client'
import useCategoriesStore from '@/zustand/category.zustand'
import './CreateBlog.css'
import UploadImage from '../UploadImage/UploadImage'
import useBlogStore from '@/zustand/blog.zustand'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FallingLines } from 'react-loader-spinner'

const CreateBlog = () => {
  const router = useRouter();
  const { categories,getAllCategories } = useCategoriesStore()
  const { createBlog } = useBlogStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const isAuthExist: any = localStorage.getItem('Auth');
    const Auth: any = JSON.parse(isAuthExist);
    const user: any = Auth?.state?.user;

    getAllCategories()

    // if (user?.role !== 'writer') {
    //   router.push('/')
    // }
  }, [])

  const [selectedImage, setSelectedImage] = useState(null);
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: '',
    // Add other fields as needed
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    console.log(e.target.value);

    setBlogData((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };

  const handleImageChange = (file: any) => {
    setSelectedImage(file);
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await Promise.all([createBlog(blogData, selectedImage)]);
      setIsLoading(false)
      // Clear the input fields after successful submission
      setBlogData({
        title: '',
        content: '',
        category: ''
      });
      setSelectedImage(null);
      router.push('/')
    } catch (error) {
      console.log(error, 'Error while Create Blog');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <div className='text-center text-4xl font-bold  p-2 mb-3'>Create Blog</div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input required name="title" id="title" type="text" value={blogData?.title} onChange={handleInputChange} className='placeholder:bg-white' />
        </div>
        <div className="form-group">
          <label htmlFor="textarea">Description</label>
          <textarea required cols={50} rows={10} id="content" name="content" value={blogData?.content} defaultValue="" onChange={handleInputChange}></textarea>
        </div>
        <select className="select select-bordered w-full max-w-xs bg-white text-black focus:outline focus:outline-[#e81cff] focus:border-[#e81cff] focus:border" name='categories' value={blogData.category} onChange={handleCategoryChange}>
  <option disabled value="" className='capitalize'>Select Category</option>
  {categories.map((category: any) => {
    return (
      <option key={category._id} value={category._id} className='capitalize z-50'>{category.title}</option>
    )
  })}
</select>

        <UploadImage onImageChange={handleImageChange} />
        <div className='flex justify-center items-center'>
          <button type="submit" className="form-submit-btn">
            {isLoading ? <span className='flex items-center justify-center'>
              <FallingLines
                color="#4fa94d"
                width="30"
                visible={true}
              // ariaLabel={"falling-circles-loading"}
              />
              <span>
                Submitting
              </span>
            </span> : 'Submit'
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog