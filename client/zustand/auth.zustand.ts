// Import necessary dependencies from zustand
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Set domain of URL to avoid from complexity
const domain = "http://localhost:3000"

// Define the AuthState interface to represent the shape of your store's state
interface AuthState {
    isLoggedin: boolean,
    token: string;
    user: {
        profileImage: string;
        name: string,
        profileData: string,
        email: string,
        password: string,
        confirmPass: string
    };
    login: (
        loginData: {
            email: string;
            password: string;
        }
    ) => void;
    signUp: (
        signupData: {
            name: string;
            email: string;
            password: string;
            role: string;
            file?: File | null;
        }
    ) => void;
    forgetPassword: (
        forgetPasswordData: {
            email: string;
        }
    ) => void;
    resetPassword: (
        resetPasswordData: {
            password: string,
            otp: string
        }
    ) => void;
    updateUserData: (updateData: any) => void;
    getSingleUser: () => void;
    signout: () => void;
}

// Define the AuthStore function to create and manage the state of your store
const AuthStore = (set: any): AuthState => ({
    isLoggedin: false,
    token: '',
    user: {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        profileImage: '',
        profileData: ''
    },
    // Async function to handle user login
    login: async (loginData) => {
        try {
            console.log(loginData);

            // Make a POST request to the login endpoint
            const res = await fetch(`${domain}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            // Check if the response status is not 200 OK
            if (!res.ok) {
                // You can handle the error here, throw an error, or return a specific value
                const errorMessage = await res.text();
                set({
                    isLoggedin: false,
                    token: null,
                    user: null
                });
                return;
            }
            // Parse the response as JSON
            const loginToken = await res.json();
            console.log(loginToken);
            console.log(loginToken)
            // Update the state with the received token
            set({
                isLoggedin: true,
                token: loginToken.token,
                user: loginToken.user
            });
        } catch (error) {
            // Log any errors that occur during the login process
            console.error(error);
        }
    },

    // Function to handle user signup
    signUp: (signupData) => set(async (state: string) => {
        try {
            const formData = new FormData();
            formData.append('name', signupData.name);
            formData.append('email', signupData.email);
            formData.append('password', signupData.password);
            formData.append('role', signupData.role);

            if (signupData.file) {
                console.log(signupData.file)
                formData.append('file', signupData.file);
            }
            // Make a POST request to the signup endpoint
            const res = await fetch(`${domain}/auth/signup`, {
                method: 'POST',
                body: formData,

            });

            // Parse the response as JSON
            const signupToken = await res.json();
            console.log(signupToken)

            // Update the state with the received token
            set({
                isLoggedin: true,
                token: signupToken.token,
                user: signupToken.user
            });
        } catch (error) {
            console.log(error);
        }
    }),

    // Function to handle user Forget Password
    forgetPassword: (forgetPasswordData) => set(async (state: string) => {
        try {
            console.log(forgetPasswordData);
            // Make a POST request to the forgetPassword endpoint
            const res = await fetch(`${domain}/auth/password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(forgetPasswordData),
            });

            // Parse the response as JSON
            const forgetPasswordToken = await res.json();
            console.log(forgetPasswordToken);
            await localStorage.setItem("forgetPassword", forgetPasswordToken.token)
        } catch (error) {
            console.log(error);
        }
    }),
    // Function to handle user Reset Password
    resetPassword: (resetPasswordData) => set(async (state: string) => {
        try {
            console.log(resetPasswordData);
            const data = localStorage.getItem('forgetPassword')
            console.log(data);
            // Make a POST request to the forgetPassword endpoint
            const res = await fetch(`${domain}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${data}`
                },
                body: JSON.stringify(resetPasswordData),
            });

            // Parse the response as JSON
            const resetPasswordToken = await res.json();
            console.log(resetPasswordToken);
        } catch (error) {
            console.log(error);
        }
    }),
    getSingleUser: async () => {
        let localAuth: any = localStorage.getItem('Auth')
        localAuth = JSON.parse(localAuth)
        try {
            const res = await fetch(`${domain}/auth/profile/${localAuth?.state?.user?._id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `bearer ${localAuth?.state?.token}`
                }
            })
            const userData: any = await res.json()
            console.log('single User data', userData);

            // Update the user data in the store and local storage
            set({
                user: userData
            });
            localStorage.setItem('Auth', JSON.stringify({ state: { ...localAuth.state, user: userData } }));
        } catch (error) {
            console.log(error);
        }
    },
    // Update User Profile data
    updateUserData: async (updateData) => {
        try {
            let localAuth: any = localStorage.getItem('Auth');
            localAuth = JSON.parse(localAuth);
            if (localAuth.state.isLoggedin) {
                // Make a POST request to update user data on the server
                const res = await fetch('${domain}/auth/update-user', {
                    method: 'POST',
                    headers: {
                        "Authorization": `bearer ${localAuth?.state?.token}`
                    },
                    body: updateData,
                });

                // Parse the response as JSON
                const updatedUserData = await res.json();
                console.log(updatedUserData);
                if (!res.ok) {
                    throw new Error('Response is ok')
                }

                // Update the user data in the store
                set((state: any) => ({
                    ...state,
                    user: updatedUserData
                }));
            }
        } catch (error) {
            console.log(error);
        }
    },
    signout: () => {
        set({
            isLoggedin: false
        })
    }
});

// Create the store named 'useAuthStore' with middleware for devtools and localStorage persistence
const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            AuthStore,
            {
                name: "Auth", // Name for localStorage persistence
            }
        ),
    ),
);

// Export the useAuthStore for use in other parts of your application
export default useAuthStore;