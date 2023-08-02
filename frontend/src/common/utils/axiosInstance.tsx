import axios from "axios";
import { getJwtToken } from "./getJwtToken.ts";
import { useNavigate } from "react-router";

export const createAxiosInstance = (
  navigate: ReturnType<typeof useNavigate>
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const axiosInstance = axios.create({
    baseURL: baseUrl, // Base URL of your API
  });

  // Add a request interceptor to add the Authorization header
  axiosInstance.interceptors.request.use((config) => {
    const token = getJwtToken();

    if (!token) {
      navigate("/login");
    } else {
      config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // Check if the error is due to an expired token
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const token = getJwtToken();
        if (!token) {
          navigate("/login");
          return;
        }

        axios
          .post(`${baseUrl}/auth/refresh/`, {
            refresh: token.refreshToken,
          })
          .then((response) => {
            const newAccessToken = response?.data.access;

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            token.accessToken = newAccessToken;
            localStorage.setItem("jwtToken", JSON.stringify(token));
          })
          .catch((error) => {
            // Handle the refresh token error, possibly redirect to log in
            console.error("Error refreshing token:", error);

            localStorage.removeItem("jwtToken");

            // Redirect to login page
            navigate("/login");
          });

        // Retry the original request
        return axiosInstance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
