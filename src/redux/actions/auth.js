import axios from 'axios';
import jwt_decode from "jwt-decode";
import * as main from './main';

export const put_data_auth = (key, data) => ({
	type: "PUT_AUTH_DATA",
	key,
	data,
})

export const auth_login = (payload, history) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .post('auth/login', payload)
      .then((resp) => {                
        console.log("Masuk: ", resp.data.data.token)
        let decoded = jwt_decode(resp.data.data.token);
        console.log("decoded: ", decoded)
        
        window.localStorage.setItem('token', resp.data.data.token);
        dispatch(put_data_auth("user_jwt_data", decoded));
        dispatch(put_data_auth("isAuthenticated", true));
        history.push(`/${decoded.role}/dashboard`)
      })
      .catch((err) => {      
        // dispatch(error(err?.response?.data))
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
      });
  }
}