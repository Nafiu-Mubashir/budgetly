import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "https://personal-finance-manager-v1ha.onrender.com/api", // Replace with your API base URL
    timeout: 10000, // Timeout after 10 seconds
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // Add Authorization header if token exists
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response.data;
    },
    (error) => {
        // Handle response error globally
        if (error.response) {
            // Check for specific error statuses
            if (error.response.status === 401) {
                // Unauthorized: Redirect to login
                localStorage.removeItem("token");
            } else if (error.response.status === 500) {
                // Internal Server Error: Show a generic error message
                console.error("Something went wrong. Please try again later.");
            }
        } else if (error.request) {
            // No response from server
            console.error("No response from server. Please check your network.");
        } else {
            // Other errors
            console.error("An error occurred: " + error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
