import axios from 'axios';
import { Modal } from 'antd';

export const put_data = (key, data) => ({
	type: "PUT_DATA",
	key,
	data,
})

export const toggle_loader = (bool) => ({
  type: 'TOGGLE_LOADER',
  bool
})

export const modal_success = (msg) => {
  return () => {
    Modal.success({
      content: msg,
      centered: true,
    });
  }
}

export const check_role = () => {
  return (dispatch) => {
    dispatch(put_data("role", "nurse"))
  }
}

export const get_profile_data = (url) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .get(url)
      .then((resp) => {
        console.log("coba: ", resp.data)
        let data = resp.data.data;        
        dispatch(put_data("user_data", data))
      })
      .catch((err) => {      
        // dispatch(error(err?.response?.data))
        console.log(err);
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const error = (msg) => {
  return () => {
    Modal.error({
      title: 'Error!!',
      content: msg,
      centered: true,
    });
  }
}