import axios from 'axios';
import jwt_decode from "jwt-decode";
import { setAxios } from '../../helper/defaults';
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
        let decoded = jwt_decode(resp.data.data.token);        
        
        window.localStorage.setItem('token', resp.data.data.token);
        setAxios();
        dispatch(put_data_auth("userJWTData", decoded));
        dispatch(put_data_auth("isAuthenticated", true));
        history.push(`/${decoded.role}/dashboard`);
      })
      .catch((err) => {      
        dispatch(main.error(err?.response?.data?.error?.message));
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
      });
  }
}