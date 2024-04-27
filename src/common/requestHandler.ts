import axios, { AxiosRequestConfig } from "axios";

// Create axios client with base URL from environment variable or default to localhost
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/",
  withCredentials: true,
});

// Interceptor to add a random 10-digit number as X-TX-ID header to every request
client.interceptors.request.use((config) => {
  config.headers["X-TX-ID"] =
    Math.floor(Math.random() * 9000000000) + 1000000000;
  return config;
});

// Function to handle successful responses
const onSuccess = (response: any) => {
  console.log("Request Successful!", response);
  return response.data;
};

// Function to handle errors
const onError = (error) => {
  // Redirect to /logout if unauthorized (401) error occurs
  if (error.response && error.response.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/logout";
    }
  }

  // Return null for canceled GET requests
  if (error.config.method === "get" && error.code === "ERR_CANCELED") {
    return null;
  }

  // Return error response if sendErrorResponse is set
  if (error.config.sendErrorResponse) {
    return { err: error.response };
  }
};

/**
 * Request Wrapper with default success/error actions
 */
const request = (options: object) => {
  // Make request using axios client, then handle success or error
  return client(options).then(onSuccess).catch(onError);
};

// Type for GET request configuration
type getRequestConfig = AxiosRequestConfig & {
  sendErrorResponse?: true;
  hideWarningInfo?: true;
};

/* Api Calls
   (get, post, put, delete)
*/

// GET request function
const get = (url: string, config?: getRequestConfig) => {
  return request({
    url: `${url}`,
    method: "GET",
    ...config,
  });
};

// POST request function
const post = (url: string, obj: object) => {
  return request({
    url: `${url}`,
    method: "POST",
    data: obj || {},
  });
};

// PUT request function
const put = (url: string, obj) => {
  return request({
    url: `${url}`,
    method: "PUT",
    data: obj || {},
  });
};

// DELETE request function
const remove = (url: string, obj) => {
  return request({
    url: `${url}`,
    method: "DELETE",
    data: obj || {},
  });
};

// Function to set a common header for all requests
const setCommonHeader = (headerName, headerValue) => {
  if (typeof headerName === "string" && typeof headerValue === "string") {
    client.defaults.headers.common[headerName] = headerValue;
  }
};

// Exported HttpService object with all request functions and header setter
const HttpService = {
  get,
  post,
  put,
  remove,
  setCommonHeader,
};

export { HttpService };
