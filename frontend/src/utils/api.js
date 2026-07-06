import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
            originalRequest._retry = true;
            console.log({
                retry: originalRequest._retry
            })
            // console.log("refresh Token middleware")
            try {
                // console.log("token is refreshing")
                await api.post('/auth/refresh', {}, {
                    withCredentials: true
                });
                // console.log("token has been refreshed")
                // return api.request(originalRequest);
                return api(originalRequest);
            } catch (error) {
                // Refresh failed (e.g., refresh token expired) -> Logout user
                // window.location.href = '/login';
                // console.log("error could not refresh token")
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)
export default api;