import { create } from "zustand";

// Set domain of URL to avoid from complexity
const domain = "http://localhost:3000"



interface CategoriesState {
    categories: [];
    getAllCategories: () => void;
    categoriesBlogs: [];
    createCategories: (category: {
        name: string
    }) => void;
    getAllCategoryBlogs: (category: string) => void;
}


const CategoriesStore = (set: any): CategoriesState => ({
    categories: [],
    categoriesBlogs: [],
    getAllCategories: async () => {
        try {
            const res = await fetch(`${domain}/category`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            })
            const categoryData = await res.json();
            console.log(categoryData);

            set({
                categories: categoryData
            })
        } catch (error) {
            console.log(error);

        }
    },
    getAllCategoryBlogs: async (category: string) => {
        try {
            const res = await fetch(`${domain}/blog/category?name=${category}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            })
            const categoryData = await res.json();
            console.log(categoryData);

            set({
                categoriesBlogs: categoryData
            })
        } catch (error) {
            console.log(error);

        }
    },
    createCategories: async (category) => set(async (state: any) => {
        try {
            const res = await fetch(`${domain}/category`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(category)
            })

            const data = await res.json()
            console.log(data);
            state.getAllCategories()
            
        } catch (error) {
            console.log(error);
        }
    })

})

const useCategoriesStore = create<CategoriesState>(CategoriesStore)
export default useCategoriesStore;