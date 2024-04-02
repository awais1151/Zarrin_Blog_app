import { create } from 'zustand'

const domain = 'http://localhost:3000'

interface Blog {
    _id: string;
    title: string;
    content: string;
    category: {
        title:string
    };
    image: string;
    comments:[]
    // Add other properties as needed
}

interface blogState {
    blogs: [],
    
    singleBlog: Blog | null
    getAllBlogs: () => void


    createBlog: (blogData: {
        title: string,
        content: string,
        category: string
    }, imageData: any) => void;
    getSingleBlog: (id: string) => void;
    createComment: (id: string, commentData: any) => void;
    deleteComment: (id: string, blogId: string) => void;
    updateComment: (id: string, blogId: string, commentData: { content: string }) => void;

    giveReaction: (key: string, blogId: string) => void;
    
}


//getAllBlogs
const blogStore = (set: any): blogState => ({
    blogs: [],
    singleBlog: null,
    getAllBlogs: async () => {
        try { 
            const res = await fetch(`${domain}/blogs`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            })

            const blogsData = await res.json();
            console.log(blogsData);

            set({
                blogs: blogsData
            })
        } catch (error) {

        }
    },

    // Create Blog
    createBlog: async (blogData, imageData) => {
        console.log(blogData, imageData);
        let localAuth: any = localStorage.getItem('Auth');

        try {
            // Parse the JSON stored in localStorage
            localAuth = JSON.parse(localAuth);
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
            // Handle the error gracefully, for example by setting localAuth to null
            localAuth = null;
        }

        try {
            const formData = new FormData();
            formData.append('title', blogData.title);
            formData.append('content', blogData.content);
            formData.append('category', blogData.category);
            formData.append('file', imageData);
            // Assume you have an API endpoint to handle blog creation
            const response = await fetch(`${domain}/blogs`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localAuth?.state?.token}`, // Adjust according to your backend requirements
                },
                body: formData,
            });

            if (response.ok) {
                // Handle successful blog creation, e.g., redirect to a success page
                console.log('Blog created successfully');
            } else {
                // Handle error cases
                console.error('Failed to create blog');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    },

    getSingleBlog: async (id: string) => {
        let localAuth: any = localStorage.getItem('Auth')
        localAuth = JSON.parse(localAuth)
        try {
            // Make a POST request to the login endpoint
            const res = await fetch(`${domain}/blogs/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // Parse the response as JSON
            const blogsData: any = await res.json();
            console.log(blogsData);
            const reactionCounts = blogsData?.reaction?.reduce((counts: any, reaction: any) => {
                counts[reaction?.reactionType] = (counts[reaction?.reactionType] || 0) + 1;
                return counts;
            }, {});
            console.log(reactionCounts);
            if (localAuth) {
                const Reactions: [{}] = blogsData?.reaction
                const userReaction = Reactions?.find((reaction: any) => reaction?.user == localAuth?.state?.user?._id)
                set({
                    singleBlog: blogsData,
                });
                return { reactionCounts, userReaction }
            }
            set({
                singleBlog: blogsData,
            });
            // Update the state with the received token

            return { reactionCounts }
            // return blogsData
        } catch (error) {
            console.log(error)
        }
    },

    // Crate Comment
    createComment: async (id: string, commentData: any) => set(async (state: blogState) => {
        try {
            let localAuth: any = localStorage.getItem('Auth');
            localAuth = JSON.parse(localAuth);
            // Make a POST request to the comment endpoint
            const res = await fetch(`${domain}/comment/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localAuth?.state?.token}`
                },
                body: JSON.stringify(commentData)
            });
            // Parse the response as JSON
            const commentsData = await res.json();
            console.log(commentData);
            await state.getSingleBlog(id)
        } catch (error) {
            console.log(error);
        }
    }),
    // Deelte Comment
    deleteComment: async (id: string, blogId: string) => set(async (state: blogState) => {
        try {
            let localAuth: any = localStorage.getItem('Auth');
            localAuth = JSON.parse(localAuth);

            // Make a POST request to the comment endpoint
            const res = await fetch(`${domain}/comment/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localAuth.state.token}`
                },
            });

            // Parse the response as JSON
            const commentsData = await res.json();
            console.log(blogId, 'Deleted blog Id');

            await state.getSingleBlog(blogId)

        } catch (error) {
            console.log(error);
        }
    }),

     // Update Comment
     updateComment: async (id, blogId, commentData) => set(async (state: blogState) => {
        try {
            let localAuth: any = localStorage.getItem('Auth');
            localAuth = JSON.parse(localAuth);


            // Make a POST request to the comment endpoint
            const res = await fetch(`${domain}/comment/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localAuth.state.token}`
                },
                body: JSON.stringify({
                    comment: commentData
                })
            });

            // Parse the response as JSON
            const commentsData = await res.json();

            state.getSingleBlog(blogId)

        } catch (error) {
            console.log(error);
        }
    }),

     // Update Comment
     giveReaction: async (key: string, blogId: string) => set(async (state: blogState) => {
        try {
            let localAuth: any = localStorage.getItem('Auth');
            localAuth = JSON.parse(localAuth);
            // Make a POST request to the comment endpoint
            if (localAuth?.state?.user?.role === 'user') {
                const res = await fetch(`${domain}/reaction/${blogId}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${localAuth.state.token}`
                    },
                    body: JSON.stringify({
                        reactionType: key
                    })
                });
                const reactions = await res.json();
            } else {
                throw new Error('Only user is Allowed')
            }
            await state.getSingleBlog(blogId)
        } catch (error) {
            console.log(error);
        }
    }),




})

const useBlogStore = create<blogState>(blogStore)
export default useBlogStore

