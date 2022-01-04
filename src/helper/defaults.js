import axios from "axios";

export const setAxios = () => {
	// SET DEFAULT AXIOS	
	axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
  let token = window.localStorage.getItem("token");
  // axios.defaults.headers[process.env.REACT_APP_TOKEN_HEADER_NAME] = token;
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;	
};